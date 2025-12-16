import { cookies } from "next/headers";

export type Lang = "th" | "en";

export function getLangFromCookies(): Lang {
	const cookieStore = cookies();
	const value = cookieStore.get("lang")?.value;
	return value === "en" || value === "th" ? value : "th";
}

export function tr(lang: Lang, th: string, en: string) {
	return lang === "th" ? th : en;
}

