"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let mounted = true;

		// 1) If redirected with PKCE code param, exchange for a session
		const url = new URL(window.location.href);
		const code = url.searchParams.get("code");
		const type = url.searchParams.get("type");
		(async () => {
			try {
				if (code) {
					await supabase.auth.exchangeCodeForSession(code);
				}
			} catch {}
			// 2) Check existing session (for classic recovery links)
			const { data } = await supabase.auth.getSession();
			if (!mounted) return;
			// Ready if we have a session or type=recovery present
			setReady(!!data.session || type === "recovery");
		})();

		// 3) Also listen for PASSWORD_RECOVERY event
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") setReady(true);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);

	async function onUpdate(e: React.FormEvent) {
		e.preventDefault();
		if (password.length < 6) return setError("Password must be at least 6 characters");
		if (password !== confirm) return setError("Passwords do not match");
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.updateUser({ password });
		setLoading(false);
		if (error) return setError(error.message);
		alert("Password updated. Please sign in.");
		router.replace("/login");
	}

	return (
		<main className="min-h-screen bg-gray-800 flex items-center justify-center px-4">
			<div className="w-full max-w-md bg-gray-700/50 border border-gray-600 rounded-2xl p-8">
				<h1 className="text-2xl font-semibold text-white mb-6">Reset Password</h1>
				{!ready ? (
					<p className="text-gray-300">This link is invalid or expired. Request a new reset from the login page.</p>
				) : (
					<form className="space-y-4" onSubmit={onUpdate}>
						<input
							type="password"
							placeholder="New password"
							className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<input
							type="password"
							placeholder="Confirm password"
							className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
							required
						/>
						{error && <p className="text-red-400 text-sm">{error}</p>}
						<button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">
							{loading ? "Updating..." : "Update Password"}
						</button>
					</form>
				)}
			</div>
		</main>
	);
}


