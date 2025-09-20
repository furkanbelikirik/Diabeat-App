type BaseInputTypes = {
	label: string;
	children: React.ReactNode;
};

export default function BaseInput({ label, children }: BaseInputTypes) {
	return (
		<label className="text-sm font-medium" htmlFor={label}>
			{label}
			{children}
		</label>
	);
}
