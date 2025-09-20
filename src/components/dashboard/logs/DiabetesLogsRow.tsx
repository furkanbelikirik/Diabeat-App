import { format } from "date-fns";
import {
	BloodGlucose,
	Carbonhydrate,
	Exercise,
	InsulinBasal,
	InsulinBolus,
} from "@/components/dashboard";
import type { Tables } from "@/utils/supabase/database.types";

export default function DiabetesLogsRow({ logRowData }: { logRowData: Tables<"diabetes_logs"> }) {
	return (
		<div className="grid grid-cols-[4rem_1fr] gap-3 overflow-x-auto">
			<time className="flex items-center pl-3 text-sm" dateTime={logRowData.created_at}>
				{format(new Date(logRowData.created_at), "HH:mm")}
			</time>
			<div className="flex items-center gap-6">
				{logRowData.blood_glucose && (
					<BloodGlucose
						measurementTime={logRowData.measurement_time}
						value={logRowData.blood_glucose}
					/>
				)}
				{logRowData.insulin_basal && <InsulinBasal value={logRowData.insulin_basal} />}
				{logRowData.insulin_bolus && <InsulinBolus value={logRowData.insulin_bolus} />}
				{logRowData.carbohydrates && <Carbonhydrate value={logRowData.carbohydrates} />}
				{logRowData.exercise_duration && <Exercise value={logRowData.exercise_duration} />}
				<div />
			</div>
		</div>
	);
}
