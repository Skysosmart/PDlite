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
				<body className="min-h-screen bg-gray-800 text-white">
					<div className="container mx-auto px-4 py-16 text-center text-gray-300">Loading...</div>
				</body>
			</html>
		);
	}

	return (
		<html lang="en">
			<body className="min-h-screen bg-gray-800 text-white">
				<div className="border-b border-gray-700">
					<nav className="container mx-auto px-4 py-4 flex items-center justify-between">
						<div className="text-xl font-bold text-green-500">PD Lite</div>
						<div className="flex gap-6 text-gray-200">
							<a href="/user" className="hover:text-green-500">User</a>
							<a href="/doctor" className="hover:text-green-500">Doctor</a>
						</div>
					</nav>
				</div>
				<main className="container mx-auto px-4 py-8">{children}</main>
			</body>
		</html>
	);
}


