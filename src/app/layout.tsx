import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { Inter, Montserrat } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";
import { Footer } from "@/components";
import AuthContext from "@/lib/features/auth/AuthContext";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Diabeat",
	description: "Diabeat",
};

export const viewport: Viewport = {
	viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="tr">
			<body className={`${inter.variable} ${montserrat.variable} antialiased`}>
				<StoreProvider>
					<AuthContext>{children}</AuthContext>
				</StoreProvider>
				<Footer />
			</body>
		</html>
	);
}
