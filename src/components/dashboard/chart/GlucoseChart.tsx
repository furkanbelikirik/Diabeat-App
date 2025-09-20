"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import _ from "lodash";
import Skeleton from "react-loading-skeleton";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Card } from "@/components/ui";
import { useGetDiabetesLogsQuery } from "@/lib/features/userData/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { getDashboardChart } from "@/utils/getDashboardChart";
import "react-loading-skeleton/dist/skeleton.css";

export default function GlucoseChart() {
	const userId = useAppSelector((state) => state.auth.session?.user.id);
	const { data: logs, isLoading, isUninitialized } = useGetDiabetesLogsQuery(userId ?? skipToken);

	const chartData = logs ? getDashboardChart(logs.flatMap((log) => log.logs)) : [];

	const showSkeleton = isUninitialized || isLoading;

	return (
		<section>
			<h1
				className="from-primary to-secondary max-w-fit bg-gradient-to-r bg-clip-text text-xl
					font-bold text-transparent"
			>
				Kan Şekeri Grafiği
			</h1>
			<h2 className="mb-3 text-sm">Son 24 Saat</h2>
			{showSkeleton ? (
				<Skeleton
					baseColor="var(--color-secondary)"
					className="opacity-25"
					height={300}
					highlightColor="var(--color-primary)"
				/>
			) : _.isEmpty(chartData) ? (
				<Card className="flex h-[300px] flex-col items-center justify-center gap-2">
					<div
						className="h-full w-full bg-[url(/logo.svg)] bg-contain bg-center
							bg-no-repeat opacity-10"
					></div>
					<h1 className="text-sm italic lg:text-lg">
						Son 24 saatte girilmiş kan şekeri verisi yok...
					</h1>
				</Card>
			) : (
				<Card>
					<ResponsiveContainer height={300} width="100%">
						<LineChart
							data={chartData}
							margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis
								axisLine={false}
								dataKey="time"
								tick={{ fontSize: 12 }}
								tickMargin={10}
							/>
							<YAxis
								axisLine={false}
								domain={[
									(dataMin) => Math.max(0, dataMin - 20),
									(dataMax) => dataMax + 20,
								]}
								interval={0}
								tick={{
									fontSize: 11,
								}}
								tickFormatter={(value) => `${value}`}
								tickLine={false}
								ticks={[60, 80, 100, 120, 140, 160, 180, 200]}
								width={50}
							/>
							<Tooltip
								formatter={(value) => [`${value} mg/dL`, "Kan Şekeri"]}
								labelFormatter={(label) => `Saat: ${label}`}
							/>

							<Line
								activeDot={{
									r: 8,
									fill: "var(--color-primary)",
									stroke: "var(--color-secondary)",
									strokeWidth: 3,
								}}
								dataKey="value"
								dot={{
									r: 4,
									fill: "var(--color-primary)",
									strokeWidth: 2,
								}}
								name="Kan Şekeri"
								stroke="var(--color-primary)"
								strokeWidth={2}
								type="monotone"
							/>
						</LineChart>
					</ResponsiveContainer>
				</Card>
			)}
		</section>
	);
}
