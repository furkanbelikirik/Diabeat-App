"use client";

import { tv, type VariantProps } from "tailwind-variants";

type CardVariants = VariantProps<typeof card> & {
	children: React.ReactNode;
	className?: string;
};

const card = tv({
	base: "shadow-primary/20 border-primary/75 border-b-1 bg-white p-3 shadow-sm md:p-6",
	variants: {
		variant: {
			default: "space-y-3",
			landingPage:
				"space-y-6 transition-all ease-in-out hover:-translate-y-1 hover:shadow-md",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export default function Card({ variant, children, className }: CardVariants) {
	return <div className={card({ variant, className })}>{children}</div>;
}
