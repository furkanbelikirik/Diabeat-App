import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import _ from "lodash";
import type { Tables } from "./supabase/database.types";

dayjs.extend(duration);

export const getDashboardMetrics = (log: Tables<"diabetes_logs">[]) => {
	const exerciseDurationArray = _.compact(_.map(log, "exercise_duration"));
	const totalSeconds = _.sumBy(exerciseDurationArray, (t) => {
		const [h, m, s] = t.split(":").map(Number);
		return h * 3600 + m * 60 + s;
	});

	return {
		blood_glucose_avg: _.floor(_.meanBy(log, "blood_glucose")) || "---",
		exercise_duration_sum:
			totalSeconds > 0 ? dayjs.duration(totalSeconds, "seconds").format("HH:mm") : "--:--",
		insulin_bolus_sum: _.sumBy(log, "insulin_bolus") || "---",
		carbohydrates_sum: _.sumBy(log, "carbohydrates") || "---",
	};
};
