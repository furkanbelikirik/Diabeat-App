import { tv } from "tailwind-variants";

type FeaturesTypes = {
	icon: React.ReactNode;
	title: string;
	content: string;
}

const features = tv({
	slots: {
		icon: "text-neutral-light from-primary to-secondary flex size-12 items-center justify-center bg-gradient-to-r",
		title: "text-xl font-bold",
		content: "",
	},
});

export default function Features({ icon, title, content }: FeaturesTypes) {
	const { icon: iconSlot, title: titleSlot, content: contentSlot } = features();
	return (
		<>
			<div className={iconSlot()}>{icon}</div>
			<h1 className={titleSlot()}>{title}</h1>
			<p className={contentSlot()}>{content}</p>
		</>
	);
}
