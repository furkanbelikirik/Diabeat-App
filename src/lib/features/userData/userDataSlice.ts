import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { format, isSameDay, isYesterday } from "date-fns";
import { tr } from "date-fns/locale";
import type { RootState } from "@/lib/store";
import type { Tables, TablesInsert, TablesUpdate } from "@/utils/supabase/database.types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

type LogsTypes = {
	day: string;
	logs: Tables<"diabetes_logs">[];
};

export const getUserDataApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: `${SUPABASE_URL}/rest/v1/`,
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState;
			const token = state.auth.session?.access_token;

			headers.set("apikey", SUPABASE_ANON_KEY);

			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}

			return headers;
		},
	}),
	tagTypes: ["ProfileInfo", "DiabetesLogs"],

	endpoints: (builder) => ({
		// Profile
		getProfile: builder.query<Tables<"profiles">, string>({
			query: (userId: Tables<"profiles">["id"]) => ({
				url: "profiles",
				params: {
					select: "*",
					id: `eq.${userId}`,
				},
			}),
			transformResponse: (res: Tables<"profiles">[]) => res[0],
			providesTags: ["ProfileInfo"],
		}),
		updateProfile: builder.mutation<Tables<"profiles">, TablesUpdate<"profiles">>({
			query: ({ id, ...patch }) => ({
				url: "profiles",
				params: {
					id: `eq.${id}`,
				},
				method: "PATCH",
				body: patch,
			}),
			invalidatesTags: ["ProfileInfo"],
		}),

		//Dashboard
		getDiabetesLogs: builder.query<LogsTypes[], Tables<"diabetes_logs">["profile_id"]>({
			query: (userId) => ({
				url: "diabetes_logs",
				params: {
					select: "*",
					profile_id: `eq.${userId}`,
					order: "created_at.desc",
				},
			}),

			transformResponse: (res: Tables<"diabetes_logs">[]): LogsTypes[] => {
				const logs: LogsTypes[] = [];

				for (const log of res) {
					const logDate = new Date(log.created_at);
					const dayKey = isSameDay(logDate, new Date())
						? "Bugün"
						: isYesterday(logDate)
							? "Dün"
							: format(logDate, "d MMMM yyyy EEEE", { locale: tr });

					const logKey = logs.find((l) => l.day === dayKey);

					if (logKey) {
						logKey.logs.push(log);
					} else {
						logs.push({
							day: dayKey,
							logs: [log],
						});
					}
				}

				return logs;
			},
			providesTags: ["DiabetesLogs"],
		}),

		addDiabetesLog: builder.mutation<Tables<"diabetes_logs">, TablesInsert<"diabetes_logs">>({
			query: (log) => ({
				url: "diabetes_logs",
				method: "POST",
				body: {
					...log,
					created_at: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
				},
			}),
			invalidatesTags: ["DiabetesLogs"],
		}),

		updateDiabetesLog: builder.mutation<Tables<"diabetes_logs">, TablesUpdate<"diabetes_logs">>(
			{
				query: ({ id, ...patch }) => ({
					url: "diabetes_logs",
					params: {
						id: `eq.${id}`,
					},
					method: "PATCH",
					body: patch,
				}),
				invalidatesTags: ["DiabetesLogs"],
			},
		),

		deleteDiabetesLog: builder.mutation<void, Tables<"diabetes_logs">["id"]>({
			query: (id) => ({
				url: "diabetes_logs",
				params: {
					id: `eq.${id}`,
				},
				method: "DELETE",
			}),
			invalidatesTags: ["DiabetesLogs"],
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfileMutation,
	useGetDiabetesLogsQuery,
	useAddDiabetesLogMutation,
	useUpdateDiabetesLogMutation,
	useDeleteDiabetesLogMutation,
} = getUserDataApi;
