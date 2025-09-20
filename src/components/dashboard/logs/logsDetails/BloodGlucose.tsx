import { Utensils, UtensilsCrossed } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import type { Tables } from "@/utils/supabase/database.types";

const bloodGlucoseStyles = tv({
	slots: {
		base: "flex items-center gap-1",
		valueContainer:
			"text-neutral-light bg-secondary flex w-12 flex-col items-center justify-center p-2",
		valueStyle: "leading-tight font-semibold",
		unit: "text-xs",
	},
	variants: {
		variant: {
			details: {
				base: "bg-secondary/10 gap-3",
				valueContainer: "w-fit flex-row gap-1 p-3",
				valueStyle: "text-2xl",
				unit: "text-sm",
			},
		},
	},
});

type BloodGlucoseProps = VariantProps<typeof bloodGlucoseStyles>;

export default function BloodGlucose({
	value,
	measurementTime,
	variant,
}: BloodGlucoseProps & {
	value: Tables<"diabetes_logs">["blood_glucose"];
	measurementTime: Tables<"diabetes_logs">["measurement_time"];
}) {
	const { base, valueContainer, valueStyle, unit } = bloodGlucoseStyles({
		variant,
	});
	return (
		<div className={base()}>
			<div className={valueContainer()}>
				<span className={valueStyle()}>{value}</span>
				<span className={unit()}>mg/dL</span>
			</div>
			<div>
				{measurementTime === "beforeMeal" ? (
					<Utensils className="text-primary" size={32} />
				) : measurementTime === "afterMeal" ? (
					<UtensilsCrossed className="text-primary" size={32} />
				) : null}
			</div>

			{variant === "details" && (
				<div className="text-neutral-dark/50 mr-6 ml-auto text-sm">Kan Şekeri</div>
			)}
		</div>
	);
}
