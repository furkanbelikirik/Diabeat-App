import { Home, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components";
import { Button } from "@/components/ui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header>
				<div className="flex gap-3">
					<div className="flex items-center gap-3">
						<Image alt="Logo" className="" height={24} src="/logo.svg" width={16} />
						<span className="font-heading text-xl font-bold">Diabeat</span>
					</div>
				</div>
				<nav className="flex gap-3">
					<Link href="/dashboard" scroll={false}>
						<Button type="button" variant="menu">
							<Home />
						</Button>
					</Link>
					<Link href="/dashboard/profile" scroll={false}>
						<Button type="button" variant="menu">
							<User />
						</Button>
					</Link>
					<form action="/auth/signout" method="post">
						<Button type="submit" variant="back">
							<LogOut />
						</Button>
					</form>
				</nav>
			</Header>
			<main className="container mx-auto space-y-6 p-6 lg:max-w-3xl">{children}</main>
		</>
	);
}
