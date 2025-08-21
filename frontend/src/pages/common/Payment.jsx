import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: ''
  });

  // Mock event data (in real app, this would come from route state or API)
  const eventData = location.state?.eventData || {
    id: 'evt_001',
    title: 'Tech Conference 2024',
    date: 'March 15, 2024',
    time: '10:00 AM - 6:00 PM',
    venue: 'Tech Hub Auditorium',
    price: 1500,
    currency: 'INR',
    category: 'Technology',
    capacity: 200,
    availableSeats: 45
  };

  // Set default amount when component mounts
  useEffect(() => {
    if (eventData.price && !formData.amount) {
      setFormData(prev => ({
        ...prev,
        amount: eventData.price.toString()
      }));
    }
  }, [eventData.price]);

  // Get Razorpay key from backend
  useEffect(() => {
    const getRazorpayKey = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/payments/razorpay-key');
        if (response.ok) {
          const data = await response.json();
          setRazorpayKey(data.key);
        }
      } catch (error) {
        console.error('Failed to fetch Razorpay key:', error);
      }
    };
    
    getRazorpayKey();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'amount'];
    for (let field of required) {
      if (!formData[field]) {
        return false;
      }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    
    // Basic phone validation
    if (formData.phone.length < 10) {
      return false;
    }
    
    // Amount validation
    if (parseFloat(formData.amount) <= 0) {
      return false;
    }
    
    return true;
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Create order on backend
  const createOrder = async (orderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order. Please try again.');
    }
  };

  const handleRazorpayPayment = async () => {
    if (!validateForm()) {
      alert('Please fill all required fields correctly');
      return;
    }

    setLoading(true);
    
    try {
      // Initialize Razorpay
      const res = await initializeRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load');
        return;
      }

      // Prepare order data for backend
      const orderData = {
        amount: parseFloat(formData.amount) * 100, // Convert to paise
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
        notes: {
          event: eventData.title,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone
        }
      };

      // Create order on backend
      const order = await createOrder(orderData);
      console.log('Order created:', order);

      // Initialize Razorpay checkout with real order data
      const options = {
        key: razorpayKey,
        amount: order.amount || orderData.amount,
        currency: order.currency || 'INR',
        name: 'EventHub',
        description: `Payment for ${eventData.title}`,
        image: 'https://via.placeholder.com/150x50/6366f1/ffffff?text=EventHub',
        order_id: order.id,
        handler: function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          
          // Verify payment on backend (optional but recommended for security)
          verifyPayment(response);
          
          // Redirect to success page
          navigate('/payment-success', { 
            state: { 
              eventData, 
              transactionId: response.razorpay_payment_id,
              amount: formData.amount,
              orderId: order.id
            } 
          });
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: orderData.notes,
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment initialization failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify payment on backend (optional but recommended for security)
  const verifyPayment = async (paymentResponse) => {
    try {
      const verificationData = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature
      };

      // Call backend to verify payment
      const response = await fetch('http://localhost:5000/api/payments/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(verificationData)
      });

      if (response.ok) {
        console.log('Payment verified successfully');
      } else {
        console.warn('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
          <p className="text-gray-600 mt-2">Complete your payment for {eventData.title}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (₹) *</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              required
            />
          </div>

          <Button
            onClick={handleRazorpayPayment}
            disabled={loading || !validateForm() || !razorpayKey}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating Order...</span>
              </div>
            ) : !razorpayKey ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading Payment Gateway...</span>
              </div>
            ) : (
              <span>Pay ₹{formData.amount || eventData.price}</span>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            You will be redirected to Razorpay's secure payment gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
