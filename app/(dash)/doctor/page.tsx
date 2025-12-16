import BarChartView from "@/components/BarChart";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import TrendsChart from "@/components/TrendsChart";
import DoctorSearchPanel from "@/components/DoctorSearchPanel";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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

	return (
		<div className="space-y-8">
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-3xl font-semibold">Doctor Dashboard</h1>
				<p className="muted text-sm">Search patients by HN and monitor high-risk cases.</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="card p-5 lg:col-span-2">
					<h2 className="text-lg font-semibold mb-3">Search by HN</h2>
					<DoctorSearchPanel />
					<p className="muted text-sm mt-3">Enter a hospital number to jump directly to the patient’s biomarker trends and risk details.</p>
				</div>

				<div className="card p-5">
					<h2 className="text-lg font-semibold mb-4">Device data integration</h2>
					<div className="space-y-3 text-sm text-gray-700">
						<div className="flex items-center justify-between">
							<span>ESP32 biosensor</span>
							<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold">Online</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Raspberry Pi 4 (camera)</span>
							<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold">Streaming</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Result API</span>
							<span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">HTTP POST</span>
						</div>
						<div className="rounded-lg bg-gray-900 text-gray-100 text-xs font-mono p-3">
							<span className="text-emerald-300">POST</span> /api/device/results
							<div className="mt-2 text-gray-200">
								{`{ "hn": "123456", "total_syn": 1.23, "oligomeric_syn": 0.4, "dj1": 0.8, "tau": 0.2 }`}
							</div>
						</div>
						<p className="text-xs text-gray-500">Device data is processed in real time and attached to the patient record.</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<MetricCard title="High-risk cases" value={String(highRisk.length)} sub="Queued for doctor review" />
				<MetricCard title="Recent tests" value={String(list.length)} sub="Last 50 results" />
				<MetricCard title="Latest risk score" value={latest ? (latest.risk_score ?? 0).toFixed(2) : "—"} sub={latest ? new Date(latest.created_at).toLocaleString() : "No data"} />
			</div>

			<div className="card p-5">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">Patient risk overview</h2>
					{latest && <StatusBadge level={latest.risk_level} />}
				</div>
				<div className="grid md:grid-cols-2 gap-6">
					<BarChartView
						values={{
							total_syn: latest?.total_syn ?? avg.total_syn ?? 0,
							oligomeric_syn: latest?.oligomeric_syn ?? avg.oligomeric_syn ?? 0,
							dj1: latest?.dj1 ?? avg.dj1 ?? 0,
							tau: latest?.tau ?? avg.tau ?? 0,
						}}
					/>
					<div className="space-y-3 text-sm text-gray-700">
						<div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
							<p className="font-semibold text-gray-900">Recommendation</p>
							<p className="text-gray-600 mt-1">
								Review biomarker trajectories and consider scheduling a follow-up visit for any elevated or see-doctor results.
							</p>
						</div>
						<ul className="space-y-2">
							<li className="flex items-start gap-2">
								<span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
								<span>Use the HN search to pull the complete timeline and download result data.</span>
							</li>
							<li className="flex items-start gap-2">
								<span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
								<span>High-risk queue highlights any “see doctor” cases for immediate action.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="card p-5">
				<div className="p-4 border border-gray-100 rounded-lg bg-white mb-4">
					<h2 className="text-lg font-semibold">Recent Tests</h2>
					<p className="muted text-sm">Latest submissions from the Raspberry Pi + ESP32 data pipeline.</p>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="text-left text-gray-500">
							<tr>
								<th className="px-4 py-3">Date</th>
								<th className="px-4 py-3">HN / User</th>
								<th className="px-4 py-3">Risk</th>
								<th className="px-4 py-3">Score</th>
								<th className="px-4 py-3"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{list.map((t: any) => (
								<tr key={t.id} className="hover:bg-gray-50">
									<td className="px-4 py-3 text-gray-800">{new Date(t.created_at).toLocaleString()}</td>
									<td className="px-4 py-3 text-gray-800">{t.user_id}</td>
									<td className="px-4 py-3"><StatusBadge level={t.risk_level} /></td>
									<td className="px-4 py-3 text-gray-800">{(t.risk_score ?? 0).toFixed(2)}</td>
									<td className="px-4 py-3"><a className="text-emerald-600 hover:underline font-medium" href={`/doctor/patient/${t.user_id}`}>View</a></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="card p-5">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-lg font-semibold">High Risk Queue</h2>
					<span className="text-sm muted">{highRisk.length} cases</span>
				</div>
				<div className="divide-y divide-gray-200">
					{highRisk.length === 0 && <p className="p-4 text-gray-600">No high risk cases.</p>}
					{highRisk.map((t) => (
						<div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-50 rounded-lg">
							<div>
								<p className="text-sm muted">{new Date(t.created_at).toLocaleString()}</p>
								<p className="text-gray-900 font-medium">User: {t.user_id}</p>
							</div>
							<div className="flex items-center gap-3">
								<StatusBadge level={"see_doctor"} />
								<a className="text-emerald-600 hover:underline font-medium" href={`/doctor/patient/${t.user_id}`}>View</a>
							</div>
						</div>
					))}
				</div>
			</div>

			{list.length > 0 && (
				<div className="card p-5">
					<h2 className="text-lg font-semibold mb-4">Trend snapshot</h2>
					<TrendsChart
						data={list
							.map((t: any) => ({
								t: new Date(t.created_at).toLocaleDateString(),
								total_syn: t.total_syn,
								oligomeric_syn: t.oligomeric_syn,
								dj1: t.dj1,
								tau: t.tau,
								risk_score: t.risk_score,
							}))
						.reverse()}
					/>
				</div>
			)}
		</div>
	);
}
