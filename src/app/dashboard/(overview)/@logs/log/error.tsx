"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
export default function LogError() {
	const router = useRouter();
	return (
		<Button fullWidth onClick={() => router.back()} variant="back">
			Geri Dön
		</Button>
	);
}
