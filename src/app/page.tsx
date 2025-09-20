import { Activity, BarChart3, Bell, Heart, Shield, TrendingUp, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components";
import { Features, Info } from "@/components/landingPage";
import { Button, Card } from "@/components/ui";

export default function Home() {
	return (
		<>
			<Header landingPage={true}>
				<div className="inline-flex items-center gap-2">
					<Image alt="Logo" className="" height={24} src="/logo.svg" width={16} />
					<span className="font-heading text-xl font-bold">Diabeat</span>
				</div>
				<nav className="flex items-center justify-center gap-2 font-normal">
					<Link href="/login" scroll={false}>
						<Button
							className="w-full max-w-xs p-3"
							isAnimated={true}
							variant="gradient"
						>
							Giriş Yap
						</Button>
					</Link>
				</nav>
			</Header>
			<main>
				<section
					className="bg-white bg-[image:var(--bg-dots-pattern)] bg-[length:40px_40px]
						bg-repeat"
				>
					<div
						className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6
							px-6 py-12 md:gap-12 lg:gap-12"
					>
						<h1
							className="flex flex-wrap items-center justify-center gap-6
								text-5xl/tight font-bold md:text-7xl/normal"
						>
							<span
								className="from-primary to-secondary inline-block bg-gradient-to-r
									bg-clip-text text-transparent"
							>
								Diyabet
							</span>
							<span className="">Takibini</span>
							<span className="">Kolaylaştırın</span>
						</h1>

						<Link className="w-screen lg:w-fit" href="/dashboard" scroll={false}>
							<Button
								className="w-full p-6 lg:w-lg"
								isAnimated={true}
								variant="gradient"
							>
								Hemen Uygulamaya Gidin
							</Button>
						</Link>

						<p className="text-center text-lg leading-relaxed text-balance md:text-xl">
							Diabeat ile glikoz seviyelerinizi, egzersizlerinizi ve günlük
							alışkanlıklarınızı tek bir yerden yönetin. Daha sağlıklı bir yaşam için
							size özel verilerle destek alın.
						</p>
						<div className="grid grid-cols-2 gap-12 md:grid-cols-4">
							<Info
								content="Aktif Kullanıcı"
								icon={<Users size={24} />}
								title="10K+"
							/>
							<Info
								content="Günlük Ölçüm"
								icon={<Activity size={24} />}
								title="50K+"
							/>
							<Info
								content="Başarı Oranı"
								icon={<TrendingUp size={24} />}
								title="%95"
							/>
							<Info
								content="Güvenilirlik"
								icon={<Shield size={24} />}
								title="%99.9"
							/>
						</div>
					</div>
				</section>

				<section className="bg-neutral-light px-6 py-12">
					<div className="container mx-auto">
						<div className="mb-12 space-y-6 text-center">
							<h1 className="text-4xl font-bold">Neden Diabeat?</h1>
							<p className="mx-auto max-w-3xl text-lg md:text-xl">
								Diyabet yönetimini kolaylaştıran akıllı özelliklerle sağlığınızı
								kontrol altında tutun
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
							<Card variant="landingPage">
								<Features
									content="Kan şekeri, ilaç ve egzersiz takibinizi tek yerden yönetin"
									icon={<Activity size={36} />}
									title="Akıllı Takip"
								/>
							</Card>
							<Card variant="landingPage">
								<Features
									content="Verilerinizi analiz edin ve trendleri kolayca görün"
									icon={<BarChart3 size={36} />}
									title="Detaylı Raporlar"
								/>
							</Card>
							<Card variant="landingPage">
								<Features
									content="İlaç ve ölçüm zamanlarınızı asla kaçırmayın"
									icon={<Bell size={36} />}
									title="Akıllı Hatırlatıcılar"
								/>
							</Card>
							<Card variant="landingPage">
								<Features
									content="Kişiselleştirilmiş hedefler belirleyin ve takip edin"
									icon={<Heart size={36} />}
									title="Sağlık Hedefleri"
								/>
							</Card>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
