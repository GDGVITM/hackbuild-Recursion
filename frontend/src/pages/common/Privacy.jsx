import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Globe, Bell, Settings } from 'lucide-react';

const Privacy = () => {
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Privacy Policy Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                At EventHub, we are committed to protecting your privacy and ensuring the security of your 
                personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our services.
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                By using our services, you consent to the collection and use of information in accordance 
                with this policy. We are committed to maintaining the trust and confidence of our users.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Important:</strong> This Privacy Policy is effective as of February 20, 2024. 
                  We may update this policy from time to time, and we will notify you of any changes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    We collect personal information that you provide directly to us, including:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Name, email address, and phone number</p>
                    <p>• Date of birth and gender</p>
                    <p>• Address and location information</p>
                    <p>• Payment and billing information</p>
                    <p>• Profile pictures and biographical information</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Event-Related Information</h4>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    We collect information related to your event participation:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Event registrations and attendance</p>
                    <p>• Event preferences and interests</p>
                    <p>• Feedback and reviews</p>
                    <p>• Communication with event organizers</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h4>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    We automatically collect certain information when you use our services:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Device information and IP addresses</p>
                    <p>• Browser type and operating system</p>
                    <p>• Usage patterns and preferences</p>
                    <p>• Cookies and similar technologies</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Provision</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Process event registrations</p>
                    <p>• Manage user accounts</p>
                    <p>• Provide customer support</p>
                    <p>• Send important notifications</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Communication</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Event updates and reminders</p>
                    <p>• Marketing communications</p>
                    <p>• Newsletter and updates</p>
                    <p>• Customer service responses</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Improvement</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Analyze usage patterns</p>
                    <p>• Improve our services</p>
                    <p>• Develop new features</p>
                    <p>• Personalize user experience</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Compliance</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Comply with legal obligations</p>
                    <p>• Protect against fraud</p>
                    <p>• Enforce our terms</p>
                    <p>• Respond to legal requests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Information Sharing & Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Service Providers</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    We may share information with trusted third-party service providers who assist us in 
                    operating our platform, processing payments, and providing customer support.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Event Organizers</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    When you register for an event, we may share relevant information with the event 
                    organizer to facilitate your participation and provide event-related services.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Requirements</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    We may disclose information when required by law, court order, or government request, 
                    or to protect our rights, property, or safety.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Business Transfers</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    In the event of a merger, acquisition, or sale of assets, your information may be 
                    transferred as part of the business transaction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Lock className="w-5 h-5 text-green-600" />
                <span>Data Security & Protection</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Technical Measures</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Encryption of data in transit and at rest</p>
                    <p>• Secure authentication systems</p>
                    <p>• Regular security assessments</p>
                    <p>• Access controls and monitoring</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Organizational Measures</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Employee training on data protection</p>
                    <p>• Confidentiality agreements</p>
                    <p>• Incident response procedures</p>
                    <p>• Regular policy reviews</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <strong>Security Commitment:</strong> We continuously monitor and update our security 
                  measures to protect your information and maintain the highest standards of data protection.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Data Retention & Deletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Retention Periods</h4>
                  <p className="text-gray-700 text-sm sm:text-base mb-3">
                    We retain your personal information for as long as necessary to provide our services 
                    and fulfill the purposes outlined in this policy:
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Account information: Until account deletion</p>
                    <p>• Event data: 7 years for legal compliance</p>
                    <p>• Payment information: As required by law</p>
                    <p>• Marketing data: Until consent withdrawal</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Data Deletion</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    You can request deletion of your personal information at any time. We will process 
                    your request within 30 days and confirm when your data has been deleted.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                You have certain rights regarding your personal information:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Access & Control</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Access your personal data</p>
                    <p>• Update or correct information</p>
                    <p>• Request data deletion</p>
                    <p>• Export your data</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Communication Preferences</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Opt-out of marketing emails</p>
                    <p>• Manage notification settings</p>
                    <p>• Control cookie preferences</p>
                    <p>• Unsubscribe from newsletters</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Exercise Your Rights:</strong> To exercise any of these rights, please contact 
                  us using the information provided at the end of this policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies & Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Cookies & Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Essential cookies for functionality</p>
                    <p>• Performance cookies for analytics</p>
                    <p>• Functional cookies for preferences</p>
                    <p>• Marketing cookies for advertising</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Management</h4>
                  <p className="text-gray-700 text-sm sm:text-base">
                    You can control cookie settings through your browser preferences. However, disabling 
                    certain cookies may affect the functionality of our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <Globe className="w-5 h-5 text-blue-600" />
                <span>International Data Transfers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure that such transfers comply with applicable data protection laws and implement 
                appropriate safeguards.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Data Protection Standards:</strong> We maintain the same level of data protection 
                  regardless of where your information is processed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm sm:text-base">
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you become aware that a child 
                has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 text-sm sm:text-base">
                We may update this Privacy Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Notification:</strong> We will notify you of any material changes to this policy 
                  by posting the new policy on our website and updating the effective date.
                </p>
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
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <p><strong>Company:</strong> EventHub</p>
                  <p><strong>Privacy Officer:</strong> privacy@eventhub.com</p>
                  <p><strong>General Inquiries:</strong> support@eventhub.com</p>
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
                This Privacy Policy is effective as of February 20, 2024, and will remain in effect 
                except with respect to any changes in its provisions in the future, which will be in 
                effect immediately after being posted on this page.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
