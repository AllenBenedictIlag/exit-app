'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  LineChart, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [expandSecurity, setExpandSecurity] = useState(false);
  const [expandMethodology, setExpandMethodology] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 sm:py-32 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Better insights from <span className="text-blue-600">exit interviews</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Transform exit interview data into actionable insights that help improve employee retention and company culture.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth"
                  className="px-8 py-4 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-4 text-base font-medium rounded-md text-blue-600 bg-white border border-blue-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative h-96">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-blue-200 to-blue-400 rounded-lg opacity-20"></div>
              <div className="absolute top-5 right-10 p-6 bg-white rounded-lg shadow-xl w-64 transform rotate-3">
                <BarChart3 className="text-blue-500 mb-3" size={24} />
                <h3 className="font-semibold">Exit Reasons</h3>
                <p className="text-sm text-gray-600">Career Growth remains the top reason for departures this quarter.</p>
              </div>
              <div className="absolute bottom-10 left-10 p-6 bg-white rounded-lg shadow-xl w-64 transform -rotate-2">
                <LineChart className="text-green-500 mb-3" size={24} />
                <h3 className="font-semibold">Retention Improved</h3>
                <p className="text-sm text-gray-600">15% increase in retention after implementing feedback from exit data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Why Choose Our System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-blue-100 p-4 rounded-full mb-5">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data-Driven Insights</h3>
              <p className="text-gray-600">Transform exit feedback into actionable insights with advanced analytics and visualizations.</p>
            </div>
            
            {/* Benefit 2 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-green-100 p-4 rounded-full mb-5">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Improve Retention</h3>
              <p className="text-gray-600">Identify trends and address issues before they lead to increased turnover rates.</p>
            </div>
            
            {/* Benefit 3 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-amber-100 p-4 rounded-full mb-5">
                <ShieldCheck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Confidential</h3>
              <p className="text-gray-600">Ensure privacy with robust security measures that protect sensitive employee feedback.</p>
            </div>
            
            {/* Benefit 4 */}
            <div className="flex flex-col items-center text-center p-6 rounded-lg">
              <div className="bg-purple-100 p-4 rounded-full mb-5">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Streamlined Process</h3>
              <p className="text-gray-600">Simplify exit interviews with intuitive forms and automated workflows for HR teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-5 -left-5 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <h3 className="text-xl font-semibold mb-4">Conduct Interviews</h3>
              <p className="text-gray-600">HR teams or managers conduct structured exit interviews using our intuitive template system.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-5 -left-5 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <h3 className="text-xl font-semibold mb-4">Analyze Data</h3>
              <p className="text-gray-600">Our system automatically processes and categorizes feedback, generating visual reports and identifying trends.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-5 -left-5 bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <h3 className="text-xl font-semibold mb-4">Take Action</h3>
              <p className="text-gray-600">Use insights to implement targeted improvements in company policies, management practices, and culture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">What HR Professionals Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4">
                <div className="text-blue-600 text-6xl font-serif">"</div>
              </div>
              <div className="pt-6">
                <p className="text-gray-600 italic mb-6">This system has revolutionized how we handle departures. We've identified key issues and reduced turnover by 22% in six months.</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Jennifer Davis</h4>
                    <p className="text-sm text-gray-500">HR Director, Tech Solutions Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4">
                <div className="text-blue-600 text-6xl font-serif">"</div>
              </div>
              <div className="pt-6">
                <p className="text-gray-600 italic mb-6">The analytics dashboard alone is worth it. We can now see patterns we were missing before and act on them quickly.</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">MR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Rodriguez</h4>
                    <p className="text-sm text-gray-500">People Operations, Global Manufacturing</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm relative">
              <div className="absolute -top-4 -left-4">
                <div className="text-blue-600 text-6xl font-serif">"</div>
              </div>
              <div className="pt-6">
                <p className="text-gray-600 italic mb-6">Implementation was smooth and our executives finally understand the real reasons behind employee departures.</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">SP</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Park</h4>
                    <p className="text-sm text-gray-500">VP of Human Resources, Financial Services Ltd.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Learn More</h2>
          
          {/* Data Security Expandable */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-6 bg-white text-left"
              onClick={() => setExpandSecurity(!expandSecurity)}
            >
              <div className="flex items-center">
                <ShieldCheck className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Data Security & Privacy</h3>
              </div>
              {expandSecurity ? 
                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />
              }
            </button>
            {expandSecurity && (
              <div className="p-6 bg-white border-t border-gray-100">
                <p className="text-gray-600 mb-4">
                  Our system employs enterprise-grade security measures to protect sensitive employee data:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">End-to-end encryption for all data in transit and at rest</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Role-based access controls with detailed permission settings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Anonymization options for sensitive feedback</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Regular security audits and compliance with data protection regulations</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Methodology Expandable */}
          <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-6 bg-white text-left"
              onClick={() => setExpandMethodology(!expandMethodology)}
            >
              <div className="flex items-center">
                <LineChart className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold">Our Methodology</h3>
              </div>
              {expandMethodology ? 
                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />
              }
            </button>
            {expandMethodology && (
              <div className="p-6 bg-white border-t border-gray-100">
                <p className="text-gray-600 mb-4">
                  Our approach is based on proven best practices in HR analytics and organizational psychology:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Structured interview frameworks that collect both quantitative and qualitative data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Natural language processing to identify themes in open-ended responses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Benchmarking against industry standards and your historical data</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Actionable recommendation engine that suggests specific improvements</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-blue-600">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to transform your exit interview process?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join leading companies that use our system to improve retention and create better workplaces.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth"
              className="px-8 py-4 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#demo"
              className="px-8 py-4 text-base font-medium rounded-md text-white bg-transparent border border-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Exit Interview System</h3>
            <p className="text-gray-400">Transforming exit data into actionable insights for better workplaces.</p>
          </div>
          <div>
            <h4 className="text-white text-base font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-base font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Exit Interview System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}