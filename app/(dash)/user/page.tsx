import { createSupabaseServerClient } from "@/lib/supabase/server";
import UserDashboardClient from "./UserDashboardClient";

export default async function UserDashboard() {
	const supabase = createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	let latest: any = null;
	let list: any[] = [];
	if (user) {
		const { data } = await supabase
			.from("tests")
			.select("id, created_at, total_syn, oligomeric_syn, dj1, tau, risk_score, risk_level")
			.eq("user_id", user.id)
			.order("created_at", { ascending: false })
			.limit(20);
		list = data ?? [];
		latest = list[0] ?? null;
	}

	return <UserDashboardClient latest={latest} list={list} />;
}
