import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DoctorDashboardClient from "./DoctorDashboardClient";

export default async function DoctorDashboard() {
	const supabase = createSupabaseServerClient();
	const { data: profile } = await supabase.from("profiles").select("role").single();
	if (!profile || profile.role !== "doctor") redirect("/user");

	const { data: tests } = await supabase
		.from("tests")
		.select("id, created_at, risk_level, risk_score, user_id, total_syn, oligomeric_syn, dj1, tau")
		.order("created_at", { ascending: false })
		.limit(50);

	const list = tests ?? [];
	const highRisk: any[] = list.filter((t: any) => t.risk_level === "see_doctor");
	const latest = list[0];

	const avg = ["total_syn", "oligomeric_syn", "dj1", "tau"].reduce((acc: any, key) => {
		const values = list.map((t: any) => t[key]).filter((v: number | null) => typeof v === "number");
		acc[key] = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
		return acc;
	}, {} as any);

	return <DoctorDashboardClient list={list} highRisk={highRisk} latest={latest} avg={avg} />;
}
