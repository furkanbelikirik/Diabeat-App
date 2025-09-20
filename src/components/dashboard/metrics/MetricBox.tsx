import { tv } from "tailwind-variants";
import { Card } from "@/components/ui";

type MetricBoxProps = {
	title: string;
	value: string | number;
	unit: string;
	icon: React.ReactNode;
	dataTypeStyle: "glucose" | "insulin" | "carb" | "exercise";
};

const metricBox = tv({
	base: "flex flex-col justify-center gap-2",
	slots: {
		title: "text-lg font-semibold",
		value: "text-2xl font-extrabold",
		unit: "text-sm",
		icon: "absolute right-0 bottom-0",
	},
	variants: {
		dataTypeStyle: {
			glucose: {
				icon: "text-secondary",
				value: "text-secondary",
			},
			insulin: {
				icon: "text-primary",
				value: "text-primary",
			},
			carb: {
				icon: "text-yellow-600",
				value: "text-yellow-600",
			},
			exercise: {
				icon: "text-accent",
				value: "text-accent",
			},
		},
	},
});

export default function MetricBox({ title, value, unit, icon, dataTypeStyle }: MetricBoxProps) {
	const {
		title: titleSlot,
		value: valueSlot,
		unit: unitSlot,
		icon: iconSlot,
		base,
	} = metricBox({ dataTypeStyle });
	return (
		<Card>
			<div className="relative">
				<div className={base()}>
					<h2 className={titleSlot()}> {title}</h2>
					<span className={valueSlot()}> {value}</span>
					<span className={unitSlot()}> {unit}</span>
				</div>
				<div className={iconSlot()}> {icon}</div>
			</div>
		</Card>
	);
}
