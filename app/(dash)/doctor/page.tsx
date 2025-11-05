import StatusBadge from "@/components/StatusBadge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DoctorDashboard() {
	const supabase = createSupabaseServerClient();
	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.single();
	if (!profile || profile.role !== "doctor") redirect("/user");

	const { data: tests } = await supabase
		.from("tests")
		.select("id, created_at, risk_level, risk_score, user_id")
		.order("created_at", { ascending: false })
		.limit(50);

    const highRisk: any[] = (tests ?? []).filter((t: any) => t.risk_level === "see_doctor");

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-semibold">Doctor Overview</h1>
			<div className="bg-gray-700/50 border border-gray-600 rounded-xl">
				<div className="p-4 border-b border-gray-600 flex items-center justify-between">
					<h2 className="font-semibold">High Risk Queue</h2>
					<span className="text-sm text-gray-300">{highRisk.length} cases</span>
				</div>
				<div className="divide-y divide-gray-600">
					{highRisk.length === 0 && <p className="p-4 text-gray-300">No high risk cases.</p>}
					{highRisk.map((t) => (
						<div key={t.id} className="p-4 flex items-center justify-between hover:bg-gray-600/20">
							<div>
								<p className="text-sm text-gray-300">{new Date(t.created_at).toLocaleString()}</p>
								<p className="text-white">User: {t.user_id}</p>
							</div>
							<div className="flex items-center gap-3">
								<StatusBadge level={"see_doctor"} />
								<a className="text-green-400 hover:underline" href={`/doctor/patient/${t.user_id}`}>View</a>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="bg-gray-700/50 border border-gray-600 rounded-xl">
				<div className="p-4 border-b border-gray-600">
					<h2 className="font-semibold">Recent Tests</h2>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="text-left text-gray-300">
							<tr>
								<th className="px-4 py-3">Date</th>
								<th className="px-4 py-3">User</th>
								<th className="px-4 py-3">Risk</th>
								<th className="px-4 py-3">Score</th>
								<th className="px-4 py-3"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-600">
                        {(tests ?? []).map((t: any) => (
								<tr key={t.id} className="hover:bg-gray-600/20">
									<td className="px-4 py-3">{new Date(t.created_at).toLocaleString()}</td>
									<td className="px-4 py-3">{t.user_id}</td>
									<td className="px-4 py-3"><StatusBadge level={t.risk_level} /></td>
									<td className="px-4 py-3">{(t.risk_score ?? 0).toFixed(2)}</td>
									<td className="px-4 py-3"><a className="text-green-400 hover:underline" href={`/doctor/patient/${t.user_id}`}>View</a></td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}


