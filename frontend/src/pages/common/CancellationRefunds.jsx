import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, RefreshCw, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

const CancellationRefunds = () => {
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Cancellation & Refunds Policy</h1>
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
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <span>Policy Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                At EventHub, we understand that sometimes plans change. We strive to provide fair and transparent 
                cancellation and refund policies for all our events and services. This policy outlines the terms 
                and conditions for cancellations and refunds.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> All cancellation and refund requests must be submitted through our 
                  official channels. Please read this policy carefully before making any decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cancellation Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <XCircle className="w-5 h-5 text-red-600" />
                <span>Event Cancellation Policy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Free Cancellation Period</h3>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Most events offer a free cancellation period up to 24 hours before the event start time.
                  </p>
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">100% refund available</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Late Cancellation</h3>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Cancellations made within 24 hours of the event may be subject to partial refunds or no refunds.
                  </p>
                  <div className="flex items-center space-x-2 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Partial refund may apply</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">No-Show Policy</h3>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    Participants who do not attend the event without prior cancellation will not be eligible for refunds.
                  </p>
                  <div className="flex items-center space-x-2 text-red-600">
                    <XCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">No refund available</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <RefreshCw className="w-5 h-5 text-green-600" />
                <span>Refund Process</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 1</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Submit Cancellation Request</h4>
                    <p className="text-gray-600 text-sm">Contact our support team or use the cancellation form in your account.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 2</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Review & Approval</h4>
                    <p className="text-gray-600 text-sm">Our team will review your request within 24-48 hours.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 3</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Refund Processing</h4>
                    <p className="text-gray-600 text-sm">Once approved, refunds are processed within 5-7 business days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Step 4</Badge>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Confirmation</h4>
                    <p className="text-gray-600 text-sm">You'll receive an email confirmation once the refund is completed.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Refund Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Original Payment Method</h4>
                  <p className="text-gray-600 text-sm">
                    Refunds are typically processed back to the original payment method used for the transaction.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Processing Time</h4>
                  <p className="text-gray-600 text-sm">
                    Credit/Debit cards: 5-7 business days<br/>
                    Digital wallets: 3-5 business days<br/>
                    Bank transfers: 7-10 business days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Special Circumstances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Event Cancellation by Organizer</h4>
                    <p className="text-gray-600 text-sm">Full refunds are provided if an event is cancelled by the organizer.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Force Majeure Events</h4>
                    <p className="text-gray-600 text-sm">Natural disasters, pandemics, or government restrictions may affect refund policies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Technical Issues</h4>
                    <p className="text-gray-600 text-sm">Refunds may be provided for technical issues that prevent event participation.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                If you have any questions about our cancellation and refund policy, please contact our support team:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> support@eventhub.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST</p>
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
                This cancellation and refund policy is subject to change. We will notify users of any significant 
                changes through our website and email communications. Continued use of our services constitutes 
                acceptance of the updated policy.
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

export default CancellationRefunds;
