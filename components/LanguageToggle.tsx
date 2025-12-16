"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
	const { lang, setLang } = useLanguage();
	return (
		<div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-2 py-1 text-sm">
			<button
				onClick={() => setLang("th")}
				className={`px-3 py-1 rounded-full ${lang === "th" ? "bg-emerald-500 text-white shadow" : "text-gray-700"}`}
				aria-label="Switch to Thai"
			>
				ไทย
			</button>
			<button
				onClick={() => setLang("en")}
				className={`px-3 py-1 rounded-full ${lang === "en" ? "bg-emerald-500 text-white shadow" : "text-gray-700"}`}
				aria-label="Switch to English"
			>
				EN
			</button>
		</div>
	);
}

