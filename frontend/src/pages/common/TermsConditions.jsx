import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Shield, Users, CreditCard, Globe, Lock } from 'lucide-react';

const TermsConditions = () => {
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Terms and Conditions</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Introduction</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Welcome to EventHub. These Terms and Conditions ("Terms") govern your use of our website, 
                mobile applications, and services (collectively, the "Service") operated by EventHub ("we," 
                "us," or "our").
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
                with any part of these terms, then you may not access the Service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> Please read these Terms carefully before using our Service. 
                  These Terms constitute a legally binding agreement between you and EventHub.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                By using our Service, you represent and warrant that:
              </p>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">You are at least 18 years old or have parental consent</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">You have the legal capacity to enter into these Terms</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">You will use the Service in accordance with these Terms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Service Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                EventHub provides a platform for:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Event Management</h4>
                  <p className="text-gray-600 text-sm">
                    Creating, organizing, and managing various types of events including conferences, 
                    workshops, cultural events, and networking opportunities.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Ticket Sales</h4>
                  <p className="text-gray-600 text-sm">
                    Selling and distributing event tickets through our secure payment processing system.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">User Management</h4>
                  <p className="text-gray-600 text-sm">
                    Managing user accounts, registrations, and providing customer support services.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics & Reporting</h4>
                  <p className="text-gray-600 text-sm">
                    Providing event analytics, attendance tracking, and performance reports.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Accounts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Users className="w-5 h-5 text-green-600" />
                <span>User Accounts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Creation</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    To access certain features of our Service, you must create an account. You are responsible 
                    for maintaining the confidentiality of your account credentials and for all activities 
                    that occur under your account.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Security</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    You must notify us immediately of any unauthorized use of your account or any other 
                    breach of security. We are not liable for any loss or damage arising from your failure 
                    to comply with this security obligation.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Termination</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    We reserve the right to terminate or suspend your account at any time for violations 
                    of these Terms or for any other reason at our sole discretion.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span>Payment Terms</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Payment Processing</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    All payments are processed through secure third-party payment processors. By making a 
                    payment, you agree to the terms and conditions of the applicable payment processor.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Pricing & Fees</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Event prices and fees are displayed at the time of purchase. All prices are subject 
                    to change without notice. Additional fees may apply for certain services.
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Refunds</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    Refund policies are determined by individual event organizers and are subject to our 
                    general refund policy. Please refer to our Cancellation & Refunds Policy for details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">User Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                You agree not to use the Service to:
              </p>
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">Violate any applicable laws or regulations</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">Infringe upon the rights of others</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">Transmit harmful, offensive, or inappropriate content</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">Attempt to gain unauthorized access to our systems</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 text-sm sm:text-base">Interfere with the proper functioning of the Service</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Lock className="w-5 h-5 text-green-600" />
                <span>Privacy & Data Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                Your privacy is important to us. Our collection, use, and protection of your personal 
                information is governed by our Privacy Policy, which is incorporated into these Terms 
                by reference.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Data Security:</strong> We implement appropriate technical and organizational 
                  measures to protect your personal data against unauthorized access, alteration, 
                  disclosure, or destruction.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                The Service and its original content, features, and functionality are owned by EventHub 
                and are protected by international copyright, trademark, patent, trade secret, and other 
                intellectual property laws.
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                You retain ownership of any content you submit to the Service, but you grant us a 
                worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute 
                such content in connection with the Service.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                To the maximum extent permitted by law, EventHub shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including without limitation, 
                loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                Our total liability to you for any claims arising from these Terms or your use of the 
                Service shall not exceed the amount you paid to us in the twelve (12) months preceding 
                the claim.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>Governing Law</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm sm:text-base">
                These Terms shall be governed by and construed in accordance with the laws of the United States, 
                without regard to its conflict of law provisions. Any disputes arising from these Terms or 
                the Service shall be resolved in the courts of competent jurisdiction.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                Your continued use of the Service after any changes constitutes acceptance of the new Terms. 
                If you do not agree to the new terms, you are no longer authorized to use the Service.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Company:</strong> EventHub</p>
                  <p><strong>Email:</strong> legal@eventhub.com</p>
                  <p><strong>Address:</strong> 123 Event Street, Tech City, TC 12345, United States</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Effective Date */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Effective Date</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm sm:text-base">
                These Terms and Conditions are effective as of February 20, 2024, and will remain in effect 
                except with respect to any changes in their provisions in the future, which will be in effect 
                immediately after being posted on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TermsConditions;
