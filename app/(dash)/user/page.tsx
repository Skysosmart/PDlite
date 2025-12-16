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
		<div className="space-y-10">
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-3xl font-semibold">Patient Dashboard</h1>
				{latest && <StatusBadge level={latest.risk_level} />}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="card p-6 lg:col-span-2">
					<h2 className="text-lg font-semibold">Result overview</h2>
					<p className="muted text-sm mb-4">Your latest saliva biomarker results.</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						<MetricCard title="Last test date" value={latest ? new Date(latest.created_at).toLocaleString() : "—"} />
						<MetricCard title="Risk score" value={latest ? (latest.risk_score ?? 0).toFixed(2) : "—"} sub="Scale 0 - 1" />
						<MetricCard title="Total tests" value={String(list.length)} />
					</div>
					{latest ? (
						<div className="mt-4 grid md:grid-cols-2 gap-4">
							<div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
								<p className="text-sm font-semibold text-gray-900">Risk classification</p>
								<p className="text-sm text-gray-600 mt-1">Color-coded for quick understanding:</p>
								<div className="flex gap-3 mt-3">
									<span className="px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-100">Green = Safe</span>
									<span className="px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700 border border-amber-100">Yellow = Moderate</span>
									<span className="px-3 py-1 rounded-full text-sm bg-rose-50 text-rose-700 border border-rose-100">Red = High</span>
								</div>
								<p className="text-sm text-gray-700 mt-3">
									If you see red, please contact your clinic or schedule an appointment below.
								</p>
							</div>
							<div className="p-4 rounded-lg border border-gray-200 bg-white">
								<p className="text-sm font-semibold text-gray-900">What this means</p>
								<p className="text-sm text-gray-700 mt-2 leading-relaxed">
									This score summarizes your biomarker pattern (α-synuclein, DJ-1, Tau). Keep monitoring trends and follow your doctor’s guidance.
								</p>
							</div>
						</div>
					) : (
						<p className="muted text-sm mt-4">No tests yet. Device uploads or clinic visits will appear here.</p>
					)}
				</div>

				<div className="card p-6">
					<h3 className="text-lg font-semibold mb-3">Educational highlights</h3>
					<ul className="space-y-3 text-sm text-gray-700">
						<li>
							<span className="font-semibold text-gray-900">Early symptoms:</span> Tremor, stiffness, slowness of movement, reduced facial expression.
						</li>
						<li>
							<span className="font-semibold text-gray-900">Prevention tips:</span> Regular exercise, balanced diet, quality sleep, and cognitive activities.
						</li>
						<li>
							<span className="font-semibold text-gray-900">Stay informed:</span> New guidance is updated dynamically by the clinic CMS.
						</li>
					</ul>
					<div className="mt-4 p-4 rounded-lg border border-emerald-100 bg-emerald-50 text-sm text-emerald-800">
						Latest update: “Understanding α-synuclein and how saliva-based screening works.”
					</div>
				</div>
			</div>

			<div className="card p-6">
				<h2 className="text-lg font-semibold mb-2">Trend chart</h2>
				<p className="muted text-sm mb-4">Track how each biomarker and your risk score change over time.</p>
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
			</div>

			<div className="card p-6">
				<h2 className="text-lg font-semibold mb-2">Results table</h2>
				<p className="muted text-sm mb-4">Detailed measurements from each test.</p>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="text-left text-gray-500">
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
						<tbody className="divide-y divide-gray-200">
							{list.map((t) => (
								<tr key={t.id} className="hover:bg-gray-50">
									<td className="px-4 py-3 text-gray-900">{new Date(t.created_at).toLocaleString()}</td>
									<td className="px-4 py-3">
										<StatusBadge level={t.risk_level} />
									</td>
									<td className="px-4 py-3 text-gray-900">{t.total_syn ?? "—"}</td>
									<td className="px-4 py-3 text-gray-900">{t.oligomeric_syn ?? "—"}</td>
									<td className="px-4 py-3 text-gray-900">{t.dj1 ?? "—"}</td>
									<td className="px-4 py-3 text-gray-900">{t.tau ?? "—"}</td>
									<td className="px-4 py-3">
										<a className="text-emerald-600 hover:underline font-medium" href={`/user/test/${t.id}`}>View</a>
									</td>
								</tr>) )}
						</tbody>
					</table>
				</div>
			</div>

			<div className="card p-6">
				<h2 className="text-lg font-semibold mb-2">Contact & appointment</h2>
				<p className="muted text-sm mb-4">Request a visit or send a note to your clinic.</p>
				<form className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">Clinic location</label>
						<select className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900">
							<option>Main Parkinson’s clinic</option>
							<option>Neurology satellite clinic</option>
							<option>Telehealth</option>
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">Preferred date/time</label>
						<input type="datetime-local" className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" />
					</div>
					<div className="md:col-span-2 flex flex-col gap-2">
						<label className="text-sm text-gray-700">Message</label>
						<textarea rows={4} className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" placeholder="Share symptoms, questions, or device notes" />
					</div>
					<div className="md:col-span-2 flex justify-end">
						<button type="button" className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
							Submit request
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}


