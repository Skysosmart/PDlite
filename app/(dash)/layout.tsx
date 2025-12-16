"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

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
		<html lang="en">
			<body className="min-h-screen bg-gray-50 text-gray-900">
				<div className="border-b border-gray-200 bg-white/80 backdrop-blur">
					<nav className="container mx-auto px-4 py-4 flex items-center justify-between">
						<div className="text-xl font-bold text-emerald-600">PD Lite</div>
						<div className="flex gap-6 text-gray-600">
							<a href="/user" className="hover:text-emerald-600 font-medium">Patient</a>
							<a href="/doctor" className="hover:text-emerald-600 font-medium">Doctor</a>
						</div>
					</nav>
				</div>
				<main className="container mx-auto px-4 py-8">{children}</main>
			</body>
		</html>
	);
}


