"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
	values: { total_syn: number; oligomeric_syn: number; dj1: number; tau: number };
};

export default function BarChartView({ values }: Props) {
	return (
		<div className="card p-5">
			<Bar
				data={{
					labels: ["Total α-syn", "Oligomeric α-syn", "DJ-1", "Tau"],
					datasets: [
						{
							label: "Value",
							data: [values.total_syn, values.oligomeric_syn, values.dj1, values.tau],
							backgroundColor: ["#34d399", "#22c55e", "#a3e635", "#86efac"],
						},
					],
				}}
				options={{
					plugins: { legend: { labels: { color: "#111827" } } },
					scales: {
						y: { beginAtZero: true, ticks: { color: "#475467" }, grid: { color: "#e5e7eb" } },
						x: { ticks: { color: "#475467" }, grid: { color: "#f3f4f6" } },
					},
				}}
			/>
		</div>
	);
}


