"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "th" | "en";

type LanguageContextType = {
	lang: Lang;
	setLang: (lang: Lang) => void;
	t: (opts: { en: string; th: string }) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLangState] = useState<Lang>("th");

	useEffect(() => {
		const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
		if (stored === "en" || stored === "th") {
			setLangState(stored);
		} else {
			setLangState("th");
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("lang", lang);
			document.cookie = `lang=${lang}; path=/; max-age=31536000`;
		}
	}, [lang]);

	const value = useMemo<LanguageContextType>(
		() => ({
			lang,
			setLang: (l) => setLangState(l),
			t: ({ en, th }) => (lang === "th" ? th : en),
		}),
		[lang]
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
	return ctx;
}
"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "th" | "en";

type LangContext = {
	lang: Lang;
	setLang: (lang: Lang) => void;
	toggle: () => void;
};

const LanguageContext = createContext<LangContext | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLangState] = useState<Lang>("th");

	useEffect(() => {
		const saved = typeof window !== "undefined" ? (localStorage.getItem("pdlite-lang") as Lang | null) : null;
		if (saved === "th" || saved === "en") setLangState(saved);
	}, []);

	const setLang = (val: Lang) => {
		setLangState(val);
		if (typeof window !== "undefined") localStorage.setItem("pdlite-lang", val);
	};

	const toggle = () => setLang(lang === "th" ? "en" : "th");

	const value = useMemo(() => ({ lang, setLang, toggle }), [lang]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	const ctx = useContext(LanguageContext);
	if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
	return ctx;
}

