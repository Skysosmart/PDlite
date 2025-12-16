"use client";

import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import ScrollAnimation from "@/components/ScrollAnimation";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            <span className="text-emerald-600">PD</span>
            <span className="text-gray-900">lite</span>
          </a>
          <div className="flex gap-4 items-center">
            <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t({ th: "หน้าแรก", en: "Home" })}</a>
            <a href="#contact" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t({ th: "ติดต่อ", en: "Contact" })}</a>
            <a href="#information" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t({ th: "ข้อมูล", en: "Information" })}</a>
            <a href="#developer" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t({ th: "นักพัฒนา", en: "Developer" })}</a>
            <a href="#ai-analytics" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">{t({ th: "วิเคราะห์ AI", en: "AI Analytics" })}</a>
            <a href="/login" className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
              {t({ th: "เข้าสู่ระบบ", en: "Login" })}
            </a>
            <LanguageToggle />
          </div>
        </nav>
      </header>

      {/* Full-Screen Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-gray-50 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollAnimation delay={200}>
            <h1 className="text-7xl md:text-9xl font-bold mb-8 animate-fade-in">
              <span className="text-emerald-600">PD</span>
              <span className="text-gray-900">lite</span>
          </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={400}>
            <p className="text-2xl md:text-4xl text-gray-700 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            Saliva-based pre-screening for Parkinson’s with real-time web dashboards.
          </p>
          </ScrollAnimation>
          <ScrollAnimation delay={600}>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/login" className="px-10 py-4 bg-emerald-500 text-white rounded-lg font-semibold text-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 hover:scale-105">
              Login / Sign up
            </a>
              <a href="/user" className="px-10 py-4 border-2 border-emerald-500 text-emerald-600 rounded-lg font-semibold text-lg hover:bg-emerald-500 hover:text-white transition-all hover:scale-105">
              User Dashboard
            </a>
              <a href="/doctor" className="px-10 py-4 border-2 border-emerald-500 text-emerald-600 rounded-lg font-semibold text-lg hover:bg-emerald-500 hover:text-white transition-all hover:scale-105">
              Doctor View
            </a>
            </div>
          </ScrollAnimation>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          </div>
        </section>

      <div className="container mx-auto px-4 py-16">

        {/* Quick glance using shared components */}
        <ScrollAnimation>
        <section className="grid md:grid-cols-3 gap-4 mb-16">
          <MetricCard title="System Status" value="Online" sub="Cloud connected" />
          <MetricCard title="Avg. Risk (demo)" value="0.42" sub="Last 24h" />
            <div className="card p-5 flex items-center justify-between">
              <p className="text-gray-700">Example Status</p>
            <StatusBadge level="normal" />
          </div>
        </section>
        </ScrollAnimation>

        {/* Feature highlights */}
        <ScrollAnimation>
        <section className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="card p-8 hover:border-emerald-400 transition-all hover:scale-105">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Processing</h3>
              <p className="text-gray-600">Under 15 minutes per test with automated workflow.</p>
          </div>

            <div className="card p-8 hover:border-emerald-400 transition-all hover:scale-105">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Realtime Dashboards</h3>
              <p className="text-gray-600">Doctor and User UIs with mobile support.</p>
          </div>

            <div className="card p-8 hover:border-emerald-400 transition-all hover:scale-105">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure by Design</h3>
              <p className="text-gray-600">Supabase Auth + RLS, server-side ingestion.</p>
            </div>
          </section>
        </ScrollAnimation>

        {/* AI Analytics Section */}
        <ScrollAnimation>
          <section id="ai-analytics" className="mb-24 scroll-mt-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">AI-Powered Analytics</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Leveraging DeepSeek AI to analyze test results and provide personalized prevention strategies
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="card p-8 border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">DeepSeek AI Analysis</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our AI system analyzes biomarker patterns from your test results using DeepSeek’s advanced language model 
                  to identify risk factors and provide actionable insights.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <span>Pattern recognition in biomarker levels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <span>Personalized risk assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <span>Evidence-based prevention recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="card p-8 border-2 border-emerald-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">Prevention Strategies</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Based on your test results, our AI generates personalized prevention plans that include:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Lifestyle modifications (diet, exercise, sleep)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Early intervention recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>Follow-up testing schedules</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>When to consult healthcare professionals</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="card p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">1</div>
                  <p className="text-gray-700 font-medium">Test Results</p>
                  <p className="text-sm text-gray-600 mt-1">Biomarker data from hardware</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">2</div>
                  <p className="text-gray-700 font-medium">AI Analysis</p>
                  <p className="text-sm text-gray-600 mt-1">DeepSeek processes patterns</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">3</div>
                  <p className="text-gray-700 font-medium">Insights</p>
                  <p className="text-sm text-gray-600 mt-1">Personalized recommendations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">4</div>
                  <p className="text-gray-700 font-medium">Action Plan</p>
                  <p className="text-sm text-gray-600 mt-1">Prevention strategies</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* Information Section */}
        <ScrollAnimation>
          <section id="information" className="mb-24 scroll-mt-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">About Parkinson’s Disease</h3>
              <p className="text-gray-700 mb-4">
                Parkinson’s Disease is a progressive neurological disorder that affects movement. Early detection through 
                salivary biomarkers can help identify risk factors before symptoms become severe.
              </p>
              <p className="text-gray-700">
                Our PDLite platform uses advanced biosensor technology to analyze key biomarkers including α-synuclein, 
                DJ-1, and Tau proteins in saliva samples.
              </p>
            </div>
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Saliva sample collection at home or clinic</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Automated analysis via ESP32/Raspberry Pi hardware</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Real-time results uploaded to secure dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Risk assessment and recommendations provided</span>
                </li>
              </ul>
            </div>
          </div>
          </section>
        </ScrollAnimation>

        {/* Developer Section */}
        <ScrollAnimation>
          <section id="developer" className="mb-24 scroll-mt-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Developer</h2>
          <div className="card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Frontend</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Next.js 14 with TypeScript</li>
                  <li>• TailwindCSS for styling</li>
                  <li>• Chart.js for data visualization</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Backend</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>• Supabase for authentication & database</li>
                  <li>• RESTful API integration</li>
                  <li>• Row Level Security (RLS)</li>
                  <li>• Server-side data processing</li>
                </ul>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Hardware Integration</h4>
              <p className="text-gray-700">
                ESP32 microcontroller for sensor control, Raspberry Pi 4 for image processing and data transmission. 
                Camera module detects colorimetric changes in reagent tests.
              </p>
            </div>
          </div>
          </section>
        </ScrollAnimation>

        {/* Contact Section */}
        <ScrollAnimation>
          <section id="contact" className="mb-24 scroll-mt-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact</h2>
          <div className="card p-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <p className="text-gray-700 mb-4">
                  Have questions about PDLite? We’re here to help. Reach out to us for support, 
                  technical inquiries, or partnership opportunities.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">support@pdlite.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Send a Message</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        </ScrollAnimation>

        {/* Future Features Section */}
        <ScrollAnimation>
          <section id="future-features" className="mb-24 scroll-mt-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">Future Development</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Planned features and enhancements for PDLite platform
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card p-6 border-2 border-dashed border-gray-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile App</h3>
                <p className="text-gray-600 text-sm">Native iOS and Android apps for on-the-go access to test results and AI insights.</p>
              </div>
              <div className="card p-6 border-2 border-dashed border-gray-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Family History Tracking</h3>
                <p className="text-gray-600 text-sm">Track family medical history and genetic predispositions for comprehensive risk assessment.</p>
              </div>
              <div className="card p-6 border-2 border-dashed border-gray-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
                <p className="text-gray-600 text-sm">Longitudinal trend analysis, predictive modeling, and population health insights.</p>
              </div>
              <div className="card p-6 border-2 border-dashed border-gray-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Reminders</h3>
                <p className="text-gray-600 text-sm">Smart notifications for follow-up tests, medication reminders, and health checkups.</p>
              </div>
              <div className="card p-6 border-2 border-dashed border-gray-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Research Integration</h3>
                <p className="text-gray-600 text-sm">Opt-in participation in research studies and contribute to Parkinson’s disease research.</p>
              </div>
              <div className="card p-6 border-2 border-dashed border-gray-300">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telemedicine Integration</h3>
                <p className="text-gray-600 text-sm">Direct video consultations with neurologists and specialists based on AI recommendations.</p>
              </div>
            </div>
          </section>
        </ScrollAnimation>

        {/* CTA */}
        <ScrollAnimation>
          <section className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Sign in and view your dashboard, or explore the doctor view.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="px-10 py-4 bg-emerald-500 text-white rounded-lg font-semibold text-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30">
              Go to Login
            </a>
            <a href="/user" className="px-10 py-4 border-2 border-emerald-500 text-emerald-600 rounded-lg font-semibold text-lg hover:bg-emerald-500 hover:text-white transition-colors">
              User Dashboard
            </a>
          </div>
        </section>
        </ScrollAnimation>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; 2025 <span className="text-emerald-600 font-semibold">PD</span><span className="text-gray-900">lite</span>. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
