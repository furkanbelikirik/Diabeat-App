import { tv, type VariantProps } from "tailwind-variants";

type HeaderProps = VariantProps<typeof header> & {
	children: React.ReactNode;
	landingPage?: boolean;
};

const header = tv({
	base: "border-neutral-dark/10 bg-neutral-light/80 sticky top-0 z-50 border-b backdrop-blur-sm",
	slots: {
		container: "mx-auto flex items-center justify-between p-6",
	},
	variants: {
		landingPage: {
			true: {
				container: "container",
			},
			false: {
				container: "container lg:max-w-3xl",
			},
		},
	},
	defaultVariants: {
		landingPage: false,
	},
});

export default function Header({ children, landingPage }: HeaderProps) {
	const { base, container: containerSlot } = header({ landingPage });
	return (
		<header className={base()}>
			<div className={containerSlot()}>{children}</div>
		</header>
	);
}
