import BarChart from "@/components/BarChart";
import StatusBadge from "@/components/StatusBadge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default async function TestDetail({ params }: Props) {
	const supabase = createSupabaseServerClient();
	const { data } = await supabase
		.from("tests")
		.select("id, created_at, total_syn, oligomeric_syn, dj1, tau, risk_score, risk_level")
		.eq("id", params.id)
		.single();

	if (!data) return notFound();

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Test Detail</h1>
				<StatusBadge level={data.risk_level} />
			</div>
			<p className="text-gray-300">{new Date(data.created_at).toLocaleString()}</p>
			<BarChart values={{ total_syn: data.total_syn ?? 0, oligomeric_syn: data.oligomeric_syn ?? 0, dj1: data.dj1 ?? 0, tau: data.tau ?? 0 }} />
			<div className="bg-gray-700/50 border border-gray-600 rounded-xl p-5">
				<p className="text-gray-300">Risk Score: <span className="text-white font-semibold">{(data.risk_score ?? 0).toFixed(2)}</span></p>
			</div>
		</div>
	);
}


