type SelectInputOptionTypes = {
	children: React.ReactNode;
};

export default function SelectInputOption({
	children,
	...props
}: SelectInputOptionTypes & React.SelectHTMLAttributes<HTMLOptionElement>) {
	return <option {...props}>{children}</option>;
}
