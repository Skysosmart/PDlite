import TrendsChart from "@/components/TrendsChart";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";

type Props = { params: { id: string } };

export default async function PatientDetail({ params }: Props) {
	const supabase = createSupabaseServerClient();
	const { data: profile } = await supabase.from("profiles").select("role").single();
	if (!profile || profile.role !== "doctor") redirect("/user");

	const { data: tests } = await supabase
		.from("tests")
		.select("id, created_at, total_syn, oligomeric_syn, dj1, tau, risk_score")
		.eq("user_id", params.id)
		.order("created_at", { ascending: false })
		.limit(100);

	if (!tests) return notFound();

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Patient {params.id}</h1>
			<TrendsChart
				data={tests
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
			<div className="bg-gray-700/50 border border-gray-600 rounded-xl overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="text-left text-gray-300">
						<tr>
							<th className="px-4 py-3">Date</th>
							<th className="px-4 py-3">Total</th>
							<th className="px-4 py-3">Oligomeric</th>
							<th className="px-4 py-3">DJ-1</th>
							<th className="px-4 py-3">Tau</th>
							<th className="px-4 py-3">Score</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-600">
						{tests.map((t: any) => (
							<tr key={t.id} className="hover:bg-gray-600/20">
								<td className="px-4 py-3">{new Date(t.created_at).toLocaleString()}</td>
								<td className="px-4 py-3">{t.total_syn ?? "—"}</td>
								<td className="px-4 py-3">{t.oligomeric_syn ?? "—"}</td>
								<td className="px-4 py-3">{t.dj1 ?? "—"}</td>
								<td className="px-4 py-3">{t.tau ?? "—"}</td>
								<td className="px-4 py-3">{(t.risk_score ?? 0).toFixed(2)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}


