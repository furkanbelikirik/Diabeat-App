"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { DiabetesLogsRow } from "@/components/dashboard";
import { useGetDiabetesLogsQuery } from "@/lib/features/userData/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import "react-loading-skeleton/dist/skeleton.css";
import _ from "lodash";

export default function DiabetesLogs() {
	const userId = useAppSelector((state) => state.auth.session?.user.id);
	const { data: logs, isLoading, isUninitialized } = useGetDiabetesLogsQuery(userId ?? skipToken);

	const showSkeleton = isUninitialized || isLoading;

	if (showSkeleton)
		return (
			<Skeleton
				baseColor="var(--color-secondary)"
				className="mb-3 opacity-25"
				count={10}
				height={48}
				highlightColor="var(--color-primary)"
			/>
		);

	if (_.isEmpty(logs))
		return (
			<div className="flex h-full flex-col items-center justify-center gap-6">
				<div
					className="h-1/3 w-full bg-[url(/logo.svg)] bg-contain bg-center bg-no-repeat
						opacity-10"
				></div>
				<h1 className="text-lg italic">Diabeat yolculuğuna başlıyorsun...</h1>
			</div>
		);

	return (
		<>
			{logs?.map((log) => (
				<details
					className="group space-y-3 details-content:mt-0 details-content:origin-top
						details-content:scale-y-95 details-content:opacity-0
						details-content:transition-all details-content:duration-300
						details-content:ease-in-out open:details-content:mt-2
						open:details-content:scale-y-100 open:details-content:opacity-100"
					key={log.day}
					name="LogsDataList"
				>
					<summary
						className="bg-secondary text-neutral-light mb-0 flex cursor-pointer
							items-center justify-between p-3 font-semibold"
					>
						<h1>{log.day}</h1>
						<svg
							className="h-5 w-5 transform transition-transform duration-150
								group-open:rotate-90"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>DetailsIcon</title>
							<path
								d="M9 5l7 7-7 7"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</svg>
					</summary>
					<div className="space-y-3">
						{log.logs.map((log) => (
							<Link
								className="hover:bg-neutral-light block"
								href={`/dashboard/log/${log.id}`}
								key={log.id}
							>
								<DiabetesLogsRow key={log.id} logRowData={log} />
							</Link>
						))}
					</div>
				</details>
			))}
		</>
	);
}
