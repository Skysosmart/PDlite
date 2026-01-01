"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import StatusBadge from "./StatusBadge";
import { useLanguage } from "./LanguageProvider";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const client = createClient(supabaseUrl, supabaseAnonKey);

export default function QueueBoard() {
	const { lang, t } = useLanguage();
	const [queue, setQueue] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadQueue();
		const interval = setInterval(loadQueue, 5000);
		return () => clearInterval(interval);
	}, []);

	async function loadQueue() {
		try {
			const { data, error } = await client
				.from("tests")
				.select("id, created_at, risk_level, risk_score, user_id")
				.eq("risk_level", "see_doctor")
				.order("created_at", { ascending: false })
				.limit(20);

			if (error) {
				console.error("Error loading queue:", error);
				return;
			}

			setQueue(data || []);
			setLoading(false);
		} catch (err) {
			console.error("Failed to load queue:", err);
			setLoading(false);
		}
	}

	if (loading) {
		return (
			<div className="card p-6">
				<h2 className="text-2xl font-semibold mb-4">
					{t({ th: "บอร์ดคิวผู้ป่วย", en: "Patient Queue Board" })}
				</h2>
				<p className="text-gray-600">{t({ th: "กำลังโหลด...", en: "Loading..." })}</p>
			</div>
		);
	}

	return (
		<div className="card p-6">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold">
					{t({ th: "บอร์ดคิวผู้ป่วย", en: "Patient Queue Board" })}
				</h2>
				<span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-lg">
					{queue.length} {t({ th: "เคส", en: "cases" })}
				</span>
			</div>

			{queue.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-xl text-gray-600">
						{t({ th: "ไม่มีผู้ป่วยในคิว", en: "No patients in queue" })}
					</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{queue.map((item) => (
						<div
							key={item.id}
							className="p-5 border-2 border-red-200 bg-red-50 rounded-lg hover:shadow-lg transition-all"
						>
							<div className="flex items-center justify-between mb-3">
								<StatusBadge level="see_doctor" />
								<span className="text-sm text-gray-600">
									{new Date(item.created_at).toLocaleTimeString()}
								</span>
							</div>
							<p className="text-lg font-semibold text-gray-900 mb-2">
								{t({ th: "ผู้ใช้", en: "User" })}: {item.user_id}
							</p>
							<p className="text-sm text-gray-700 mb-3">
								{t({ th: "คะแนนความเสี่ยง", en: "Risk Score" })}:{" "}
								<span className="font-bold text-red-600">
									{(item.risk_score ?? 0).toFixed(2)}
								</span>
							</p>
							<a
								href={`/doctor/patient/${item.user_id}`}
								className="block w-full text-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
							>
								{t({ th: "ดูรายละเอียด", en: "View Details" })}
							</a>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

