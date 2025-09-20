import { tv, type VariantProps } from "tailwind-variants";
import type { Tables } from "@/utils/supabase/database.types";

const carbonhydrateStyles = tv({
	slots: {
		base: "flex items-center",
		valueContainer:
			"text-neutral-light flex w-12 flex-col items-center justify-center bg-yellow-600 p-2",
		valueStyle: "leading-tight font-semibold",
		unit: "text-xs",
	},
	variants: {
		variant: {
			details: {
				base: "bg-yellow-600/10",
				valueContainer: "w-fit flex-row gap-1 p-3",
				valueStyle: "text-2xl",
				unit: "text-sm",
			},
		},
	},
});

type CarbonhydrateProps = VariantProps<typeof carbonhydrateStyles>;

export default function Carbonhydrate({
	value,
	variant,
}: CarbonhydrateProps & {
	value: Tables<"diabetes_logs">["carbohydrates"];
}) {
	const { base, valueContainer, valueStyle, unit } = carbonhydrateStyles({ variant });
	return (
		<div className={base()}>
			<div className={valueContainer()}>
				<span className={valueStyle()}> {value}</span>
				<span className={unit()}>gr</span>
			</div>

			{variant === "details" && (
				<div className="text-neutral-dark/50 mr-6 ml-auto text-sm">Karbonhidrat</div>
			)}
		</div>
	);
}
