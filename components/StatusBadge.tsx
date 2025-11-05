type Props = { level: "normal" | "elevated" | "see_doctor" };

export default function StatusBadge({ level }: Props) {
	const map = {
		normal: "bg-green-500/20 text-green-400 border-green-500/40",
		elevated: "bg-amber-500/20 text-amber-300 border-amber-500/40",
		see_doctor: "bg-red-500/20 text-red-300 border-red-500/40",
	};
	const text = {
		normal: "ปกติ",
		elevated: "เริ่มมีแนวโน้มเสี่ยง",
		see_doctor: "ควรพบแพทย์",
	};
	return (
		<span className={`px-3 py-1 rounded-full text-sm border ${map[level]}`}>{text[level]}</span>
	);
}


