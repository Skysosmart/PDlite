"use client";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Point = { t: string; total_syn?: number; oligomeric_syn?: number; dj1?: number; tau?: number; risk_score?: number };
export default function TrendsChart({ data }: { data: Point[] }) {
	const labels = data.map((d) => d.t);
	return (
		<div className="bg-gray-700/50 border border-gray-600 rounded-xl p-5">
			<Line
				data={{
					labels,
					datasets: [
						{ label: "Total α-syn", data: data.map((d) => d.total_syn ?? null), borderColor: "#34d399", tension: 0.3 },
						{ label: "Oligomeric α-syn", data: data.map((d) => d.oligomeric_syn ?? null), borderColor: "#22c55e", tension: 0.3 },
						{ label: "DJ-1", data: data.map((d) => d.dj1 ?? null), borderColor: "#a3e635", tension: 0.3 },
						{ label: "Tau", data: data.map((d) => d.tau ?? null), borderColor: "#86efac", tension: 0.3 },
						{ label: "Risk score", data: data.map((d) => d.risk_score ?? null), borderColor: "#f59e0b", tension: 0.3, yAxisID: "y1" },
					],
				}}
				options={{
					responsive: true,
					scales: { y: { beginAtZero: true }, y1: { position: "right", min: 0, max: 1 } },
					plugins: { legend: { labels: { color: "#e5e7eb" } } },
				}}
			/>
		</div>
	);
}


