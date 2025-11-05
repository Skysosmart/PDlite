import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const supabase = createSupabaseServerClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect("/login");
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


