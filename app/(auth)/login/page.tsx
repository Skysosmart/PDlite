"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function onSignIn(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		setLoading(false);
		if (error) return setError(error.message);
		router.replace("/user");
	}

	async function onSignUp(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signUp({ email, password });
		setLoading(false);
		if (error) return setError(error.message);
		router.replace("/user");
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
		<main className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-gray-700/50 border border-gray-600 rounded-2xl p-8">
				<h1 className="text-2xl font-semibold text-white mb-6">PD Lite Account</h1>
				<div className="grid grid-cols-3 mb-4 text-sm">
					<button className={`py-2 ${mode==='signin'?'text-green-400':'text-gray-300'}`} onClick={(e)=>{e.preventDefault(); setMode('signin');}}>Sign In</button>
					<button className={`py-2 ${mode==='signup'?'text-green-400':'text-gray-300'}`} onClick={(e)=>{e.preventDefault(); setMode('signup');}}>Sign Up</button>
					<button className={`py-2 ${mode==='forgot'?'text-green-400':'text-gray-300'}`} onClick={(e)=>{e.preventDefault(); setMode('forgot');}}>Forgot</button>
				</div>

				<form className="space-y-4" onSubmit={mode==='signin' ? onSignIn : mode==='signup' ? onSignUp : onForgot}>
					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{mode !== 'forgot' && (
						<input
							type="password"
							placeholder="Password"
							className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					)}
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
					>
						{loading ? (mode==='forgot' ? 'Sending...' : 'Submitting...') : (mode==='signin' ? 'Sign In' : mode==='signup' ? 'Sign Up' : 'Send reset link')}
					</button>
				</form>
			</div>
		</main>
	);
}


