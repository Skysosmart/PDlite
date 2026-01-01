"use client";

import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import TrendsChart from "@/components/TrendsChart";
import { useLanguage } from "@/components/LanguageProvider";

type Props = {
	latest: any;
	list: any[];
};

export default function UserDashboardClient({ latest, list }: Props) {
	const { t } = useLanguage();

	return (
		<div className="space-y-10">
			<div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
				<h1 className="text-3xl font-semibold">{t({ th: "แดชบอร์ดผู้ป่วย", en: "Patient Dashboard" })}</h1>
				{latest && <StatusBadge level={latest.risk_level} />}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<div className="card p-6 lg:col-span-2">
					<h2 className="text-lg font-semibold">{t({ th: "สรุปผลตรวจ", en: "Result overview" })}</h2>
					<p className="muted text-sm mb-4">{t({ th: "ผลสารชีวภาพน้ำลายล่าสุดของคุณ", en: "Your latest saliva biomarker results." })}</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
						<MetricCard title={t({ th: "วันที่ตรวจล่าสุด", en: "Last test date" })} value={latest ? new Date(latest.created_at).toLocaleString() : "—"} />
						<MetricCard title={t({ th: "คะแนนความเสี่ยง", en: "Risk score" })} value={latest ? (latest.risk_score ?? 0).toFixed(2) : "—"} sub={t({ th: "ช่วง 0 - 1", en: "Scale 0 - 1" })} />
						<MetricCard title={t({ th: "จำนวนการตรวจ", en: "Total tests" })} value={String(list.length)} />
					</div>
					{latest ? (
						<div className="mt-4 grid md:grid-cols-2 gap-4">
							<div className="p-4 rounded-lg border border-gray-200 bg-gray-50">
								<p className="text-sm font-semibold text-gray-900">{t({ th: "ระดับความเสี่ยง", en: "Risk classification" })}</p>
								<p className="text-sm text-gray-600 mt-1">{t({ th: "รหัสสีเข้าใจง่าย:", en: "Color-coded for quick understanding:" })}</p>
								<div className="flex gap-3 mt-3">
									<span className="px-3 py-1 rounded-full text-sm bg-emerald-50 text-emerald-700 border border-emerald-100">{t({ th: "เขียว = ปลอดภัย", en: "Green = Safe" })}</span>
									<span className="px-3 py-1 rounded-full text-sm bg-amber-50 text-amber-700 border border-amber-100">{t({ th: "เหลือง = ปานกลาง", en: "Yellow = Moderate" })}</span>
									<span className="px-3 py-1 rounded-full text-sm bg-rose-50 text-rose-700 border border-rose-100">{t({ th: "แดง = สูง", en: "Red = High" })}</span>
								</div>
								<p className="text-sm text-gray-700 mt-3">
									{t({ th: "ถ้าเป็นสีแดง แนะนำให้ติดต่อคลินิกหรือนัดหมายด้านล่าง", en: "If you see red, please contact your clinic or schedule an appointment below." })}
								</p>
							</div>
							<div className="p-4 rounded-lg border border-gray-200 bg-white">
								<p className="text-sm font-semibold text-gray-900">{t({ th: "ความหมายของคะแนน", en: "What this means" })}</p>
								<p className="text-sm text-gray-700 mt-2 leading-relaxed">
									{t({ th: "คะแนนนี้สรุปลักษณะสารชีวภาพ (α-synuclein, DJ-1, Tau) ติดตามแนวโน้มและปฏิบัติตามคำแนะนำแพทย์", en: "This score summarizes your biomarker pattern (α-synuclein, DJ-1, Tau). Keep monitoring trends and follow your doctor's guidance." })}
								</p>
							</div>
						</div>
					) : (
						<p className="muted text-sm mt-4">{t({ th: "ยังไม่มีผลตรวจ อัปโหลดจากอุปกรณ์หรือจากคลินิกจะแสดงที่นี่", en: "No tests yet. Device uploads or clinic visits will appear here." })}</p>
					)}
				</div>

				<div className="card p-6">
					<h3 className="text-lg font-semibold mb-3">{t({ th: "ความรู้สุขภาพ", en: "Educational highlights" })}</h3>
					<ul className="space-y-3 text-sm text-gray-700">
						<li>
							<span className="font-semibold text-gray-900">{t({ th: "อาการเริ่มต้น:", en: "Early symptoms:" })}</span> {t({ th: "มือสั่น กล้ามเนื้อแข็ง เคลื่อนไหวช้า สีหน้าลดลง", en: "Tremor, stiffness, slowness of movement, reduced facial expression." })} 
						</li>
						<li>
							<span className="font-semibold text-gray-900">{t({ th: "เคล็ดลับป้องกัน:", en: "Prevention tips:" })}</span> {t({ th: "ออกกำลังสม่ำเสมอ อาหารสมดุล นอนเพียงพอ ฝึกสมอง", en: "Regular exercise, balanced diet, quality sleep, and cognitive activities." })} 
						</li>
						<li>
							<span className="font-semibold text-gray-900">{t({ th: "อัปเดตเสมอ:", en: "Stay informed:" })}</span> {t({ th: "มีคำแนะนำใหม่จากคลินิกเพิ่มเรื่อย ๆ", en: "New guidance is updated dynamically by the clinic CMS." })} 
						</li>
					</ul>
					<div className="mt-4 p-4 rounded-lg border border-emerald-100 bg-emerald-50 text-sm text-emerald-800">
						{t({ th: "อัปเดตล่าสุด: \"เข้าใจ α-synuclein และการตรวจน้ำลาย\"", en: "Latest update: \"Understanding α-synuclein and how saliva-based screening works.\"" })}
					</div>
				</div>
			</div>

			<div className="card p-6">
				<h2 className="text-lg font-semibold mb-2">{t({ th: "กราฟแนวโน้ม", en: "Trend chart" })}</h2>
				<p className="muted text-sm mb-4">{t({ th: "ติดตามการเปลี่ยนแปลงของสารชีวภาพและคะแนนความเสี่ยง", en: "Track how each biomarker and your risk score change over time." })}</p>
				<TrendsChart
					data={list
						.map((t) => ({
							t: new Date(t.created_at).toLocaleDateString(),
							total_syn: t.total_syn,
							oligomeric_syn: t.oligomeric_syn,
							dj1: t.dj1,
							tau: t.tau,
							risk_score: t.risk_score,
						}))
					.reverse()}
				/>
			</div>

			<div className="card p-6">
				<h2 className="text-lg font-semibold mb-2">{t({ th: "ตารางผลการตรวจ", en: "Results table" })}</h2>
				<p className="muted text-sm mb-4">{t({ th: "รายละเอียดค่าที่ได้จากแต่ละครั้ง", en: "Detailed measurements from each test." })}</p>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead className="text-left text-gray-500">
							<tr>
								<th className="px-4 py-3">{t({ th: "วันที่", en: "Date" })}</th>
								<th className="px-4 py-3">{t({ th: "ความเสี่ยง", en: "Risk" })}</th>
								<th className="px-4 py-3">{t({ th: "Total α-syn", en: "Total α-syn" })}</th>
								<th className="px-4 py-3">{t({ th: "Oligomeric α-syn", en: "Oligomeric α-syn" })}</th>
								<th className="px-4 py-3">DJ-1</th>
								<th className="px-4 py-3">Tau</th>
								<th className="px-4 py-3"></th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{list.map((t) => (
								<tr key={t.id} className="hover:bg-gray-50">
									<td className="px-4 py-3 text-gray-900">{new Date(t.created_at).toLocaleString()}</td>
									<td className="px-4 py-3">
										<StatusBadge level={t.risk_level} />
									</td>
									<td className="px-4 py-3 text-gray-900">{t.total_syn ?? "—"}</td>
									<td className="px-4 py-3 text-gray-900">{t.oligomeric_syn ?? "—"}</td>
									<td className="px-4 py-3 text-gray-900">{t.dj1 ?? "—"}</td>
									<td className="px-4 py-3 text-gray-900">{t.tau ?? "—"}</td>
									<td className="px-4 py-3">
										<a className="text-emerald-600 hover:underline font-medium" href={`/user/test/${t.id}`}>{t({ th: "ดูรายละเอียด", en: "View" })}</a>
									</td>
								</tr>) )}
						</tbody>
					</table>
				</div>
			</div>

			<div className="card p-6">
				<h2 className="text-lg font-semibold mb-2">{t({ th: "ติดต่อและนัดหมาย", en: "Contact & appointment" })}</h2>
				<p className="muted text-sm mb-4">{t({ th: "ส่งคำขอพบแพทย์หรือติดต่อคลินิก", en: "Request a visit or send a note to your clinic." })}</p>
				<form className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">{t({ th: "เลือกสถานที่คลินิก", en: "Clinic location" })}</label>
						<select className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900">
							<option>{t({ th: "คลินิกหลักพาร์กินสัน", en: "Main Parkinson's clinic" })}</option>
							<option>{t({ th: "คลินิกระบบประสาทสาขา", en: "Neurology satellite clinic" })}</option>
							<option>{t({ th: "พบแพทย์ทางไกล", en: "Telehealth" })}</option>
						</select>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-sm text-gray-700">{t({ th: "วันและเวลาที่สะดวก", en: "Preferred date/time" })}</label>
						<input type="datetime-local" className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" />
					</div>
					<div className="md:col-span-2 flex flex-col gap-2">
						<label className="text-sm text-gray-700">{t({ th: "ข้อความ", en: "Message" })}</label>
						<textarea rows={4} className="px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900" placeholder={t({ th: "ระบุอาการหรือคำถาม", en: "Share symptoms, questions, or device notes" })} />
					</div>
					<div className="md:col-span-2 flex justify-end">
						<button type="button" className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
							{t({ th: "ส่งคำขอ", en: "Submit request" })}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

