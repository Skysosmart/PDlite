import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            PDLite
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Saliva-based pre-screening for Parkinson’s with real-time web dashboards.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors shadow-lg shadow-green-500/50">
              Login / Sign up
            </a>
            <a href="/user" className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors">
              User Dashboard
            </a>
            <a href="/doctor" className="px-8 py-3 border-2 border-green-500 text-green-500 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors">
              Doctor View
            </a>
          </div>
        </section>

        {/* Quick glance using shared components */}
        <section className="grid md:grid-cols-3 gap-4 mb-16">
          <MetricCard title="System Status" value="Online" sub="Cloud connected" />
          <MetricCard title="Avg. Risk (demo)" value="0.42" sub="Last 24h" />
          <div className="bg-gray-700/50 border border-gray-600 rounded-xl p-5 flex items-center justify-between">
            <p className="text-gray-300">Example Status</p>
            <StatusBadge level="normal" />
          </div>
        </section>

        {/* Feature highlights */}
        <section className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-gray-700/50 p-8 rounded-xl border border-gray-600 hover:border-green-500 transition-colors">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Fast Processing</h3>
            <p className="text-gray-300">Under 15 minutes per test with automated workflow.</p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-xl border border-gray-600 hover:border-green-500 transition-colors">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Realtime Dashboards</h3>
            <p className="text-gray-300">Doctor and User UIs with mobile support.</p>
          </div>

          <div className="bg-gray-700/50 p-8 rounded-xl border border-gray-600 hover:border-green-500 transition-colors">
            <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure by Design</h3>
            <p className="text-gray-300">Supabase Auth + RLS, server-side ingestion.</p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Sign in and view your dashboard, or explore the doctor view.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/login" className="px-10 py-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors shadow-lg shadow-green-500/50">
              Go to Login
            </a>
            <a href="/user" className="px-10 py-4 border-2 border-green-500 text-green-500 rounded-lg font-semibold text-lg hover:bg-green-500 hover:text-white transition-colors">
              User Dashboard
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2024 PD Lite. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

