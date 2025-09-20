"use client";

import { skipToken } from "@reduxjs/toolkit/query";
import { Dumbbell, Syringe, TrendingUp, Wheat } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { MetricBox } from "@/components/dashboard";
import { useGetDiabetesLogsQuery } from "@/lib/features/userData/userDataSlice";
import { useAppSelector } from "@/lib/hooks";
import { getDashboardMetrics } from "@/utils/getDashboardMetrics";
import "react-loading-skeleton/dist/skeleton.css";

export default function Metrics() {
	const userId = useAppSelector((state) => state.auth.session?.user.id);
	const { log, isLoading, isUninitialized } = useGetDiabetesLogsQuery(userId ?? skipToken, {
		selectFromResult: ({ data, isLoading, isUninitialized }) => ({
			log: data?.find((item) => item.day === "Bugün")?.logs ?? [],
			isLoading,
			isUninitialized,
		}),
	});

	const metrics = getDashboardMetrics(log);

	const showSkeleton = isUninitialized || isLoading;

	return (
		<section>
			<h1
				className="from-primary to-secondary mb-3 max-w-fit bg-gradient-to-r bg-clip-text
					text-xl font-bold text-transparent"
			>
				Günlük Verilerim
			</h1>
			<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
				{showSkeleton ? (
					<Skeleton
						baseColor="var(--color-secondary)"
						className="opacity-25"
						height={145}
						highlightColor="var(--color-primary)"
					/>
				) : (
					<MetricBox
						dataTypeStyle="glucose"
						icon={<TrendingUp size={36} />}
						title="Ortalama"
						unit="mg/dL"
						value={metrics?.blood_glucose_avg}
					/>
				)}

				{showSkeleton ? (
					<Skeleton
						baseColor="var(--color-secondary)"
						className="opacity-25"
						height={145}
						highlightColor="var(--color-primary)"
					/>
				) : (
					<MetricBox
						dataTypeStyle="exercise"
						icon={<Dumbbell size={36} />}
						title="Aktivite"
						unit="saat"
						value={metrics?.exercise_duration_sum}
					/>
				)}

				{showSkeleton ? (
					<Skeleton
						baseColor="var(--color-secondary)"
						className="opacity-25"
						height={145}
						highlightColor="var(--color-primary)"
					/>
				) : (
					<MetricBox
						dataTypeStyle="carb"
						icon={<Wheat size={36} />}
						title="Karbonhidrat"
						unit="gr"
						value={metrics?.carbohydrates_sum}
					/>
				)}

				{showSkeleton ? (
					<Skeleton
						baseColor="var(--color-secondary)"
						className="opacity-25"
						height={145}
						highlightColor="var(--color-primary)"
					/>
				) : (
					<MetricBox
						dataTypeStyle="insulin"
						icon={<Syringe size={36} />}
						title="Bolus"
						unit="U"
						value={metrics?.insulin_bolus_sum}
					/>
				)}
			</div>
		</section>
	);
}
