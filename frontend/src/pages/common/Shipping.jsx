import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Truck, Clock, MapPin, Package, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Shipping & Delivery Policy</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Policy Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Shipping Policy Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                At EventHub, we understand that timely delivery of event materials and merchandise is crucial 
                for a successful event experience. This shipping policy outlines our delivery methods, 
                timelines, and policies for physical items.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> Most of our services are digital (event tickets, QR codes, etc.). 
                  Physical shipping applies only to merchandise, event materials, and special packages.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Digital vs Physical Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Digital vs Physical Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Digital Items (No Shipping)</span>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Event tickets & QR codes</p>
                    <p>• Digital certificates</p>
                    <p>• Event materials (PDFs)</p>
                    <p>• Access codes & links</p>
                  </div>
                </div>
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <span>Physical Items (Shipping Required)</span>
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Event merchandise</p>
                    <p>• Physical certificates</p>
                    <p>• Event kits & materials</p>
                    <p>• Welcome packages</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Available Shipping Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Standard Shipping</h4>
                    <Badge className="bg-blue-100 text-blue-700">3-5 Business Days</Badge>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Our most economical shipping option, perfect for non-urgent deliveries.
                  </p>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Tracking included</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Express Shipping</h4>
                    <Badge className="bg-orange-100 text-orange-700">1-2 Business Days</Badge>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Faster delivery for urgent orders, with priority handling.
                  </p>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Priority tracking & handling</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">Same Day Delivery</h4>
                    <Badge className="bg-red-100 text-red-700">Same Day</Badge>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Available for select locations and items, with additional fees.
                  </p>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Limited availability & higher cost</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Costs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Shipping Costs & Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Shipping Method</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Delivery Time</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Cost</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">Free Shipping Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700 text-sm">Standard Shipping</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">3-5 Business Days</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">$5.99</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">$50+</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700 text-sm">Express Shipping</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">1-2 Business Days</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">$12.99</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">$100+</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-700 text-sm">Same Day Delivery</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">Same Day</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">$24.99</td>
                      <td className="py-3 px-4 text-gray-600 text-sm">Not Available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Free Shipping:</strong> Orders above the specified thresholds automatically qualify 
                  for free shipping. Additional handling fees may apply for oversized or fragile items.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <MapPin className="w-5 h-5 text-green-600" />
                <span>Delivery Areas & Coverage</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Domestic Delivery</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    We deliver to all 50 states in the United States, including Alaska and Hawaii.
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• Continental US: Standard rates apply</p>
                    <p>• Alaska & Hawaii: Additional fees may apply</p>
                    <p>• Puerto Rico: Available with restrictions</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">International Delivery</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    International shipping is available to select countries with additional fees and longer delivery times.
                  </p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>• Canada: 5-7 business days</p>
                    <p>• Mexico: 7-10 business days</p>
                    <p>• Europe: 10-15 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Processing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Order Processing & Fulfillment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 1</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Order Confirmation</h4>
                    <p className="text-gray-600 text-sm">Orders are processed within 1-2 business hours during business days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 2</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Inventory Check</h4>
                    <p className="text-gray-600 text-sm">We verify item availability and prepare for shipping.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 3</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Packaging & Shipping</h4>
                    <p className="text-gray-600 text-sm">Items are carefully packaged and shipped with tracking information.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 4</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Delivery Confirmation</h4>
                    <p className="text-gray-600 text-sm">You'll receive delivery confirmation and tracking updates.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Order Tracking & Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Tracking Information</h4>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    All shipped orders include tracking numbers that are sent via email and can be accessed 
                    through your account dashboard.
                  </p>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Real-time tracking updates</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Email Notifications</h4>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    You'll receive email updates at key stages: order confirmation, shipping confirmation, 
                    and delivery confirmation.
                  </p>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Automated status updates</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Delivery Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Failed Delivery Attempts</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    If delivery fails, the carrier will attempt redelivery. After multiple failed attempts, 
                    packages may be returned to sender or held at a local facility.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Damaged Items</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    If items arrive damaged, please document the damage with photos and contact our support 
                    team within 48 hours of delivery.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Lost Packages</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    For lost packages, we'll work with the carrier to locate your order or provide a 
                    replacement/refund as appropriate.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Business Hours & Processing Times</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</p>
                    <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM EST</p>
                    <p><strong>Sunday:</strong> Closed</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Cut-off</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Standard Orders:</strong> 3:00 PM EST</p>
                    <p><strong>Express Orders:</strong> 5:00 PM EST</p>
                    <p><strong>Same Day:</strong> 11:00 AM EST</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Shipping Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                For questions about shipping, delivery, or order status, please contact our shipping support team:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> shipping@eventhub.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
                  <p><strong>Live Chat:</strong> Available during business hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm sm:text-base">
                This shipping and delivery policy is subject to change based on carrier updates, 
                service availability, and business needs. We will notify users of any significant 
                changes through our website and email communications.
              </p>
              <p className="text-gray-600 text-sm mt-3">
                <strong>Last Updated:</strong> February 20, 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Shipping;
