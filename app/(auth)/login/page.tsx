"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
	const [role, setRole] = useState<"doctor" | "patient">("patient");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const redirectPath = useMemo(() => (role === "doctor" ? "/doctor" : "/user"), [role]);

	async function onSignIn(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		if (error) return setError(error.message);
		setSuccess(true);
		setTimeout(() => router.replace(redirectPath), 600);
	}

	async function onSignUp(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		if (error) return setError(error.message);
		setSuccess(true);
		setTimeout(() => router.replace(redirectPath), 600);
	}

	async function onForgot(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/reset-password`,
		});
		setLoading(false);
		if (error) return setError(error.message);
		alert("Password reset email sent (check spam too).");
	}

	return (
		<main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
			<div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
				<section className="card p-10 subtle-grid">
					<p className="text-emerald-600 font-semibold mb-2">PDLite Platform</p>
					<h1 className="text-3xl font-bold mb-4">Secure access for Doctors and Patients</h1>
					<p className="muted leading-relaxed">
						Use your PDLite account to access dashboards, review risk trends, and
						view device submissions from the ESP32/Raspberry Pi pipeline.
					</p>
					<ul className="mt-6 space-y-3 text-sm text-gray-700">
						<li className="flex items-start gap-3">
							<span className="h-2.5 w-2.5 mt-2 rounded-full bg-emerald-500" />
							<span>Doctors: search by HN, review biomarker trends, and triage high-risk patients.</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="h-2.5 w-2.5 mt-2 rounded-full bg-emerald-500" />
							<span>Patients: track your latest results, risk level, and educational content.</span>
						</li>
					</ul>
				</section>

				<div className="card p-8 relative overflow-hidden">
					<div className={`absolute inset-0 transition-opacity duration-500 ${success ? "opacity-100 bg-emerald-50" : "opacity-0"}`} />
					<h2 className="text-2xl font-semibold mb-3">Account access</h2>
					<div className="grid grid-cols-3 mb-4 text-sm font-medium bg-gray-100 rounded-lg p-1">
						<button className={`py-2 rounded-md ${mode==='signin'?'bg-white shadow-sm text-emerald-700':'text-gray-600'}`} onClick={(e)=>{e.preventDefault(); setMode('signin');}}>Sign In</button>
						<button className={`py-2 rounded-md ${mode==='signup'?'bg-white shadow-sm text-emerald-700':'text-gray-600'}`} onClick={(e)=>{e.preventDefault(); setMode('signup');}}>Sign Up</button>
						<button className={`py-2 rounded-md ${mode==='forgot'?'bg-white shadow-sm text-emerald-700':'text-gray-600'}`} onClick={(e)=>{e.preventDefault(); setMode('forgot');}}>Forgot</button>
					</div>

					<div className="flex items-center gap-3 mb-4">
						<label className="text-sm font-medium text-gray-700">I am a:</label>
						<div className="flex gap-2">
							<button onClick={()=>setRole("patient")} className={`px-3 py-2 rounded-full border text-sm ${role==="patient" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}>
								Patient
							</button>
							<button onClick={()=>setRole("doctor")} className={`px-3 py-2 rounded-full border text-sm ${role==="doctor" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}>
								Doctor
							</button>
						</div>
					</div>

					<form className="space-y-4" onSubmit={mode==='signin' ? onSignIn : mode==='signup' ? onSignUp : onForgot}>
						<input
							type="email"
							placeholder="Email"
							className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{mode !== 'forgot' && (
							<input
								type="password"
								placeholder="Password"
								className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						)}
						{error && <p className="text-rose-600 text-sm">{error}</p>}
						<button
							type="submit"
							disabled={loading}
							className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition"
						>
							{loading ? (mode==='forgot' ? 'Sending...' : 'Submitting...') : (mode==='signin' ? 'Sign In' : mode==='signup' ? 'Create account' : 'Send reset link')}
						</button>
						{success && <p className="text-sm text-emerald-700 text-center">Success! Redirecting to your dashboard…</p>}
					</form>
				</div>
			</div>
		</main>
	);
}
