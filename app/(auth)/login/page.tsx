"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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

	return (
		<main className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-gray-700/50 border border-gray-600 rounded-2xl p-8">
				<h1 className="text-2xl font-semibold text-white mb-6">Sign in to PD Lite</h1>
				<form className="space-y-4" onSubmit={onSignIn}>
					<input
						type="email"
						placeholder="Email"
						className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					{error && <p className="text-red-400 text-sm">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
					>
						{loading ? "Signing in..." : "Sign In"}
					</button>
				</form>
				<button
					onClick={onSignUp}
					className="w-full mt-3 py-3 rounded-lg border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-semibold"
				>
					Create Account
				</button>
			</div>
		</main>
	);
}


