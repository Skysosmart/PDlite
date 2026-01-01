"use client";

import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle() {
	const { lang, setLang } = useLanguage();
	return (
		<div className="flex items-center gap-2 bg-white border-2 border-gray-300 rounded-lg px-3 py-2 shadow-sm">
			<button
				onClick={() => setLang("th")}
				className={`px-4 py-2 rounded-md font-semibold text-lg transition-all ${
					lang === "th" 
						? "bg-emerald-500 text-white shadow-md" 
						: "text-gray-700 hover:bg-gray-100"
				}`}
				aria-label="Switch to Thai"
			>
				ไทย
			</button>
			<span className="text-gray-400 text-lg">|</span>
			<button
				onClick={() => setLang("en")}
				className={`px-4 py-2 rounded-md font-semibold text-lg transition-all ${
					lang === "en" 
						? "bg-emerald-500 text-white shadow-md" 
						: "text-gray-700 hover:bg-gray-100"
				}`}
				aria-label="Switch to English"
			>
				EN
			</button>
		</div>
	);
}

