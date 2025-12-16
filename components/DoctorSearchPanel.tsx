"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DoctorSearchPanel() {
	const router = useRouter();
	const [hn, setHn] = useState("");

	function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		if (!hn.trim()) return;
		router.push(`/doctor/patient/${hn.trim()}`);
	}

	return (
		<form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
			<input
				type="text"
				placeholder="Enter Hospital Number (HN)"
				value={hn}
				onChange={(e) => setHn(e.target.value)}
				className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900"
			/>
			<button type="submit" className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
				Fetch profile
			</button>
		</form>
	);
}

