"use client";

import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

export default function LoginPage() {
	const router = useRouter();
	const { t } = useLanguage();
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
				<section className="card p-10 subtle-grid transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
					<div className="flex items-center justify-between mb-3">
						<p className="font-semibold">
							<span className="text-emerald-600">PD</span>
							<span className="text-gray-900">lite</span> Platform
						</p>
						<LanguageToggle />
					</div>
					<h1 className="text-3xl font-bold mb-4">{t({ th: "เข้าสู่ระบบสำหรับแพทย์และผู้ป่วย", en: "Secure access for Doctors and Patients" })}</h1>
					<p className="muted leading-relaxed">
						{t({
							th: "ใช้บัญชี PDLite เพื่อเข้าถึงแดชบอร์ด ดูแนวโน้มความเสี่ยง และผลจากอุปกรณ์ ESP32/Raspberry Pi",
							en: "Use your PDLite account to access dashboards, review risk trends, and view device submissions from the ESP32/Raspberry Pi pipeline.",
						})}
					</p>
					<ul className="mt-6 space-y-3 text-sm text-gray-700">
						<li className="flex items-start gap-3">
							<span className="h-2.5 w-2.5 mt-2 rounded-full bg-emerald-500" />
							<span>{t({ th: "แพทย์: ค้นหาด้วย HN ดูแนวโน้มสารชีวภาพ และจัดคิวผู้เสี่ยงสูง", en: "Doctors: search by HN, review biomarker trends, and triage high-risk patients." })}</span>
						</li>
						<li className="flex items-start gap-3">
							<span className="h-2.5 w-2.5 mt-2 rounded-full bg-emerald-500" />
							<span>{t({ th: "ผู้ป่วย: ติดตามผลล่าสุด ระดับความเสี่ยง และบทความความรู้", en: "Patients: track your latest results, risk level, and educational content." })}</span>
						</li>
					</ul>
				</section>

				<div className="card p-8 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
					<div className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${success ? "opacity-100 bg-emerald-50" : "opacity-0"}`} />
					<h2 className="text-2xl font-semibold mb-3">{t({ th: "เข้าสู่ระบบ", en: "Account access" })}</h2>
					<div className="grid grid-cols-3 mb-4 text-sm font-medium bg-gray-100 rounded-lg p-1">
						<button className={`py-2 rounded-md transition-transform duration-150 hover:-translate-y-0.5 ${mode==='signin'?'bg-white shadow-sm text-emerald-700':'text-gray-600'}`} onClick={(e)=>{e.preventDefault(); setMode('signin');}}>{t({ th: "เข้าสู่ระบบ", en: "Sign In" })}</button>
						<button className={`py-2 rounded-md transition-transform duration-150 hover:-translate-y-0.5 ${mode==='signup'?'bg-white shadow-sm text-emerald-700':'text-gray-600'}`} onClick={(e)=>{e.preventDefault(); setMode('signup');}}>{t({ th: "สมัคร", en: "Sign Up" })}</button>
						<button className={`py-2 rounded-md transition-transform duration-150 hover:-translate-y-0.5 ${mode==='forgot'?'bg-white shadow-sm text-emerald-700':'text-gray-600'}`} onClick={(e)=>{e.preventDefault(); setMode('forgot');}}>{t({ th: "ลืมรหัส", en: "Forgot" })}</button>
					</div>

					<div className="flex items-center gap-3 mb-4">
						<label className="text-sm font-medium text-gray-700">{t({ th: "ฉันคือ", en: "I am a:" })}</label>
						<div className="flex gap-2">
							<button onClick={()=>setRole("patient")} className={`px-3 py-2 rounded-full border text-sm transition-transform duration-150 hover:-translate-y-0.5 ${role==="patient" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}>
								{t({ th: "ผู้ป่วย", en: "Patient" })}
							</button>
							<button onClick={()=>setRole("doctor")} className={`px-3 py-2 rounded-full border text-sm transition-transform duration-150 hover:-translate-y-0.5 ${role==="doctor" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-600"}`}>
								{t({ th: "แพทย์", en: "Doctor" })}
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
							className="w-full py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-transform duration-150 hover:-translate-y-0.5"
						>
							{loading
								? mode === "forgot"
									? t({ th: "กำลังส่ง...", en: "Sending..." })
									: t({ th: "กำลังดำเนินการ...", en: "Submitting..." })
								: mode === "signin"
									? t({ th: "เข้าสู่ระบบ", en: "Sign In" })
									: mode === "signup"
										? t({ th: "สร้างบัญชี", en: "Create account" })
										: t({ th: "ส่งลิงก์รีเซ็ตรหัส", en: "Send reset link" })}
						</button>
						{success && <p className="text-sm text-emerald-700 text-center">{t({ th: "สำเร็จ! กำลังพาไปยังแดชบอร์ด…", en: "Success! Redirecting to your dashboard…" })}</p>}
					</form>
				</div>
			</div>
		</main>
	);
}
