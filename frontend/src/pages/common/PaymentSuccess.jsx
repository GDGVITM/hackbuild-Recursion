import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  Users, 
  Download,
  Mail,
  Home,
  ArrowRight
} from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get data from navigation state
  const { eventData, transactionId, amount } = location.state || {
    eventData: {
      title: 'Event',
      date: 'Date',
      time: 'Time',
      venue: 'Venue'
    },
    transactionId: 'N/A',
    amount: 0
  };

  const handleDownloadTicket = () => {
    // In a real app, this would generate and download a PDF ticket
    alert('Ticket download functionality would be implemented here');
  };

  const handleEmailTicket = () => {
    // In a real app, this would send ticket via email
    alert('Email functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 text-lg">
            Thank you for your purchase. Your ticket has been confirmed.
          </p>
        </div>

        {/* Transaction Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Transaction Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-semibold text-green-600">₹{amount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Payment Status</span>
              <Badge className="bg-green-100 text-green-700">Completed</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{eventData.title}</p>
                <p className="text-gray-600 text-sm">
                  {eventData.date} • {eventData.time}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">{eventData.venue}</span>
            </div>
            
            {eventData.category && (
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-purple-600" />
                <Badge variant="secondary">{eventData.category}</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={handleDownloadTicket}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Ticket
          </Button>
          
          <Button 
            onClick={handleEmailTicket}
            variant="outline"
            className="w-full py-3"
          >
            <Mail className="w-5 h-5 mr-2" />
            Send to Email
          </Button>
        </div>

        {/* Additional Information */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• You'll receive a confirmation email with your ticket</li>
                <li>• Save your ticket - you'll need it for entry</li>
                <li>• Check your email for event updates and reminders</li>
                <li>• Contact support if you have any questions</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex-1"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
          
          <Button
            onClick={() => navigate('/user/dashboard')}
            className="flex-1 bg-purple-600 hover:bg-purple-700"
          >
            View Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
