import { format, parse } from "date-fns";
import { tv, type VariantProps } from "tailwind-variants";
import type { Tables } from "@/utils/supabase/database.types";

const exerciseStyles = tv({
	slots: {
		base: "flex items-center",
		valueContainer:
			"text-neutral-light bg-accent flex w-12 flex-col items-center justify-center p-2",
		valueStyle: "leading-tight font-semibold",
		unit: "text-xs",
	},
	variants: {
		variant: {
			details: {
				base: "bg-accent/10",
				valueContainer: "w-fit flex-row gap-1 p-3",
				valueStyle: "text-2xl",
				unit: "text-sm",
			},
		},
	},
});

type ExerciseProps = VariantProps<typeof exerciseStyles>;

export default function Exercise({
	value,
	exerciseName,
	variant,
}: {
	value: Tables<"diabetes_logs">["exercise_duration"];
	exerciseName?: Tables<"diabetes_logs">["exercise_name"];
} & ExerciseProps) {
	const { base, valueContainer, valueStyle, unit } = exerciseStyles({ variant });
	return (
		<div className={base()}>
			<div className={valueContainer()}>
				<span className={valueStyle()}>
					{format(parse(value ?? "", "HH:mm:ss", new Date()), "HH:mm")}
				</span>
				<span className={unit()}>s/dd</span>
			</div>
			{variant === "details" && (
				<div className="text-neutral-dark/50 mr-6 ml-auto text-sm">
					{exerciseName ?? "Fiziksel Aktivite"}
				</div>
			)}
		</div>
	);
}
