type Props = { title: string; value: string; sub?: string };

export default function MetricCard({ title, value, sub }: Props) {
	return (
		<div className="bg-gray-700/50 border border-gray-600 rounded-xl p-5">
			<p className="text-gray-300 text-sm">{title}</p>
			<p className="text-3xl font-semibold mt-1">{value}</p>
			{sub && <p className="text-gray-400 text-sm mt-1">{sub}</p>}
		</div>
	);
}


