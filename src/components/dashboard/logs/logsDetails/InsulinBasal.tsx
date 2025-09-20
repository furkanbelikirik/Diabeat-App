import { Moon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";
import type { Tables } from "@/utils/supabase/database.types";

const insulinBasalStyles = tv({
	slots: {
		base: "flex items-center gap-1",
		valueContainer:
			"text-neutral-light bg-primary flex w-12 flex-col items-center justify-center p-2",
		valueStyle: "leading-tight font-semibold",
		unit: "text-xs",
	},
	variants: {
		variant: {
			details: {
				base: "bg-primary/10 gap-3",
				valueContainer: "w-fit flex-row gap-1 p-3",
				valueStyle: "text-2xl",
				unit: "text-sm",
			},
		},
	},
});

type InsulinBasalProps = VariantProps<typeof insulinBasalStyles>;

export default function InsulinBasal({
	value,
	variant,
}: InsulinBasalProps & {
	value: Tables<"diabetes_logs">["insulin_basal"];
}) {
	const { base, valueContainer, valueStyle, unit } = insulinBasalStyles({ variant });
	return (
		<div className={base()}>
			<div className={valueContainer()}>
				<span className={valueStyle()}> {value}</span>
				<span className={unit()}>U</span>
			</div>
			<div>
				<Moon className="text-primary" size={32} />
			</div>
			{variant === "details" && (
				<div className="text-neutral-dark/50 mr-6 ml-auto text-sm">Bazal İnsülin</div>
			)}
		</div>
	);
}
