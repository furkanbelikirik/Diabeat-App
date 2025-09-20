import { tv } from "tailwind-variants";

type InfoTypes = {
	icon: React.ReactNode;
	title: string;
	content: string;
};

const info = tv({
	base: "text-center",
	slots: {
		icon: "text-primary mb-2 flex items-center justify-center",
		title: "text-2xl font-bold",
		content: "text-sm",
	},
});

export default function Info({ icon, title, content }: InfoTypes) {
	const { icon: iconSlot, title: titleSlot, content: contentSlot, base } = info();
	return (
		<div className={base()}>
			<div className={iconSlot()}>{icon}</div>
			<div className={titleSlot()}>{title}</div>
			<div className={contentSlot()}>{content}</div>
		</div>
	);
}
