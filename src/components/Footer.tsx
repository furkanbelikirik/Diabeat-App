import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-neutral-dark text-neutral-light px-6 py-12 text-center">
			<a
				className="hover:underline"
				href="https://github.com/furkanbelikirik"
				rel="noopener"
				target="_blank"
			>
				<span className="mr-2 inline-block">
					<Image alt="Logo" className="" height={24} src="/logo.svg" width={16} />
				</span>
				Furkan Belikirik
			</a>
			<p className="!text-neutral-light mt-2 text-sm">
				©{new Date().getFullYear()} Diabeat. Next.js ile yapıldı.
			</p>
		</footer>
	);
}
