"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import LanguageToggle from "@/components/LanguageToggle";

function NavBar() {
	const { lang } = useLanguage();
	return (
		<div className="border-b border-gray-200 bg-white/80 backdrop-blur">
			<nav className="container mx-auto px-4 py-4 flex items-center justify-between">
				<div className="font-bold" style={{ fontSize: '2.5rem', lineHeight: '1' }}>
					<span className="text-emerald-600" style={{ fontSize: 'inherit' }}>PD</span>
					<span className="text-gray-900" style={{ fontSize: 'inherit' }}>lite</span>
				</div>
				<div className="flex items-center gap-6">
					<a href="/user" className="text-lg hover:text-emerald-600 font-medium">{lang === "th" ? "ผู้ป่วย" : "Patient"}</a>
					<a href="/doctor" className="text-lg hover:text-emerald-600 font-medium">{lang === "th" ? "แพทย์" : "Doctor"}</a>
					<LanguageToggle />
				</div>
			</nav>
		</div>
	);
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		let mounted = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			if (!data.session) {
				router.replace("/login");
			} else {
				setChecking(false);
			}
		});
		return () => {
			mounted = false;
		};
	}, [router, pathname]);

	if (checking) {
		return (
			<html lang="en">
				<body className="min-h-screen bg-gray-100 text-gray-900">
					<div className="container mx-auto px-4 py-16 text-center text-gray-500">Loading...</div>
				</body>
			</html>
		);
	}

	return (
		<html lang="th">
			<body className="min-h-screen bg-gray-50 text-gray-900">
				<LanguageProvider>
					<NavBar />
					<main className="container mx-auto px-4 py-8">{children}</main>
				</LanguageProvider>
			</body>
		</html>
	);
}


