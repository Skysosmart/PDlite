type Props = { level: "normal" | "elevated" | "see_doctor" };

export default function StatusBadge({ level }: Props) {
	const map = {
		normal: "bg-emerald-50 text-emerald-700 border-emerald-200",
		elevated: "bg-amber-50 text-amber-700 border-amber-200",
		see_doctor: "bg-rose-50 text-rose-700 border-rose-200",
	};
	const text = {
		normal: "ปกติ",
		elevated: "เริ่มมีแนวโน้มเสี่ยง",
		see_doctor: "ควรพบแพทย์",
	};
	return (
		<span className={`px-3 py-1 rounded-full text-sm border font-medium ${map[level]}`}>{text[level]}</span>
	);
}


