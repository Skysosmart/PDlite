type Props = { title: string; value: string; sub?: string };

export default function MetricCard({ title, value, sub }: Props) {
	return (
		<div className="card p-5">
			<p className="muted text-sm">{title}</p>
			<p className="text-3xl font-semibold mt-1">{value}</p>
			{sub && <p className="text-sm mt-1 text-gray-500">{sub}</p>}
		</div>
	);
}


