"use client";

import { Lock, Mail } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import { useActionState } from "react";
import { TextInput } from "@/components/input";
import { Button, Card } from "@/components/ui";
import { logIn } from "./actions";

export default function Login() {
	const [state, formAction, isPending] = useActionState(logIn, null);
	if (state?.success === true) {
		setTimeout(() => {
			window.location.href = "/dashboard";
		}, 1000);
	}
	return (
		<main
			className="to-neutral-light flex min-h-screen items-center justify-center
				bg-gradient-to-b from-white p-6"
		>
			<div className="w-full max-w-md space-y-6">
				<section className="space-y-3 text-center">
					<div className="flex items-center justify-center">
						<Image
							alt="Logo"
							height={64}
							src="/logo.svg"
							style={{ height: "auto" }}
							width={64}
						/>
					</div>
					<h1 className="text-3xl font-bold">Diabeat&apos;e Hoş Geldiniz</h1>
					<p className="text-md">Diyabet takip yolculuğunuza devam edin</p>
				</section>

				<section>
					<Card>
						<Form action={formAction}>
							<div
								className="border-neutral-dark/15 space-y-2 border-b pb-3
									text-center italic"
							>
								<h2 className="text-2xl font-semibold">Giriş Yap</h2>
								<p className="text-sm">
									Hesabınıza erişim sağlamak için bilgilerinizi girin
								</p>
							</div>

							<div className="relative">
								<Mail
									className="text-neutral-dark/50 absolute top-14 right-3 h-4 w-4
										-translate-y-1/2 transform"
								/>
								<TextInput
									autoComplete="email"
									label="E-Posta"
									name="email"
									placeholder="ornek@email.com"
									required
									type="text"
								/>
							</div>

							<div className="relative">
								<Lock
									className="text-neutral-dark/50 absolute top-14 right-3 h-4 w-4
										-translate-y-1/2 transform"
								/>
								<TextInput
									autoComplete="current-password"
									label="Şifre"
									name="password"
									placeholder="Şifrenizi girin"
									required
									type="password"
								/>
							</div>

							<Button
								className="w-full p-3"
								disabled={isPending}
								isAnimated
								type="submit"
								variant="gradient"
							>
								{isPending ? "Giriş Yapılıyor..." : "Giriş Yap"}
							</Button>
						</Form>

						{state && (
							<div className="mt-4 text-center">
								{state.success === false && (
									<p className="text-sm !text-red-500">{state.message}</p>
								)}
								{state.success === true && (
									<p className="text-sm !text-green-500">{state.message}</p>
								)}
							</div>
						)}
					</Card>
				</section>
			</div>
		</main>
	);
}
