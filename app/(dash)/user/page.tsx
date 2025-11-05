import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import TrendsChart from "@/components/TrendsChart";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function UserDashboard() {
	const supabase = createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	let latest: any = null;
	let list: any[] = [];
	if (user) {
		const { data } = await supabase
			.from("tests")
			.select("id, created_at, total_syn, oligomeric_syn, dj1, tau, risk_score, risk_level")
			.eq("user_id", user.id)
			.order("created_at", { ascending: false })
			.limit(20);
		list = data ?? [];
		latest = list[0] ?? null;
	}

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Your Dashboard</h1>
				{latest && <StatusBadge level={latest.risk_level} />}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<MetricCard title="Last Test" value={latest ? new Date(latest.created_at).toLocaleString() : "—"} />
				<MetricCard title="Risk Score" value={latest ? (latest.risk_score ?? 0).toFixed(2) : "—"} />
				<MetricCard title="Tests Count" value={String(list.length)} />
			</div>

			<TrendsChart
				data={list
					.map((t) => ({
						t: new Date(t.created_at).toLocaleDateString(),
						total_syn: t.total_syn,
						oligomeric_syn: t.oligomeric_syn,
						dj1: t.dj1,
						tau: t.tau,
						risk_score: t.risk_score,
					}))
				.reverse()}
			/>

			<div className="bg-gray-700/50 border border-gray-600 rounded-xl">
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="text-left text-gray-300">
							<tr>
								<th className="px-4 py-3">Date</th>
								<th className="px-4 py-3">Risk</th>
								<th className="px-4 py-3">Total</th>
								<th className="px-4 py-3">Oligomeric</th>
								<th className="px-4 py-3">DJ-1</th>
								<th className="px-4 py-3">Tau</th>
								<th className="px-4 py-3"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-600">
							{list.map((t) => (
								<tr key={t.id} className="hover:bg-gray-600/20">
									<td className="px-4 py-3">{new Date(t.created_at).toLocaleString()}</td>
									<td className="px-4 py-3">
										<StatusBadge level={t.risk_level} />
									</td>
									<td className="px-4 py-3">{t.total_syn ?? "—"}</td>
									<td className="px-4 py-3">{t.oligomeric_syn ?? "—"}</td>
									<td className="px-4 py-3">{t.dj1 ?? "—"}</td>
									<td className="px-4 py-3">{t.tau ?? "—"}</td>
									<td className="px-4 py-3">
										<a className="text-green-400 hover:underline" href={`/user/test/${t.id}`}>View</a>
									</td>
								</tr>) )}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}


