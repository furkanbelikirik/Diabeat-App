import { format, isAfter, subHours } from "date-fns";
import _ from "lodash";
import type { Tables } from "./supabase/database.types";

type ChartDataTypes = {
	time: Tables<"diabetes_logs">["created_at"];
	value: Tables<"diabetes_logs">["blood_glucose"];
};

export const getDashboardChart = (logs: Tables<"diabetes_logs">[]): ChartDataTypes[] => {
	const now = new Date();
	const twentyFourHoursAgo = subHours(now, 24);

	const chartData = _.chain(logs)
		.filter((log) => {
			return (
				!_.isNil(log.blood_glucose) && isAfter(new Date(log.created_at), twentyFourHoursAgo)
			);
		})
		.map((log) => {
			return {
				time: format(new Date(log.created_at), "HH:mm"),
				value: log.blood_glucose,
			};
		})
		.reverse()
		.value();

	return chartData;
};
