import BaseInput from "./BaseInput";

type TextInputTypes = {
	label: string;
	error?: boolean;
};

export default function TextInput({
	label,
	error,
	...props
}: TextInputTypes & React.InputHTMLAttributes<HTMLInputElement>) {
	const errorClass = error
		? "bg-accent/10 outline-accent ring-accent focus:outline-accent focus:ring-accent"
		: "";
	return (
		<BaseInput label={label}>
			<input className={errorClass} {...props} />
		</BaseInput>
	);
}
