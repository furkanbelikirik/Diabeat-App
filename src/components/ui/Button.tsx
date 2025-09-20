"use client";

import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";

type ButtonProps = VariantProps<typeof buttonStyles> &
	React.ButtonHTMLAttributes<HTMLButtonElement>;

const buttonStyles = tv({
	base: [
		"inline-flex",
		"items-center",
		"justify-center",
		"font-bold",
		"!text-neutral-light",
		"transition-all",
		"ease-in-out",
		"hover:shadow-lg",
		"disabled:cursor-not-allowed",
		"disabled:opacity-50",
		"cursor-pointer",
		"p-3",
	],
	variants: {
		variant: {
			gradient: "from-primary to-secondary hover:shadow-primary/20 bg-gradient-to-r",
			back: "bg-accent hover:shadow-accent/20",
			menu: "bg-secondary hover:shadow-secondary/20",
		},
		isAnimated: {
			true: "hover:-translate-y-1 hover:scale-105",
		},
		fullWidth: {
			true: "w-full",
		},
	},
	defaultVariants: {
		variant: "gradient",
		isAnimated: false,
		fullWidth: false,
	},
});

export default function Button({
	children,
	variant,
	fullWidth,
	isAnimated,
	className,
	type = "button",
	...rest
}: ButtonProps) {
	return (
		<button
			{...rest}
			className={buttonStyles({ variant, fullWidth, isAnimated, className })}
			type={type}
		>
			{children}
		</button>
	);
}
