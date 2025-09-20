import BaseInput from "./BaseInput";

type SelectInputTypes = {
	label: string;
	children: React.ReactNode;
	error?: boolean;
};

export default function SelectInput({
	label,
	children,
	error,
	...props
}: SelectInputTypes & React.SelectHTMLAttributes<HTMLSelectElement>) {
	const errorClass = error
		? "bg-accent/10 outline-accent ring-accent focus:outline-accent focus:ring-accent"
		: "";
	return (
		<BaseInput label={label}>
			<select {...props} className={errorClass}>
				{children}
			</select>
		</BaseInput>
	);
}
