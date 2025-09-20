"use server";

import { createClient } from "@/utils/supabase/server";

export default async function WelcomeUser() {
	const supabase = await createClient();
	const userId = (await supabase.auth.getUser()).data.user?.id;
	const profile = await supabase.from("profiles").select("*").eq("id", userId).single();
	return (
		<hgroup>
			<h1
				className="from-primary to-secondary max-w-fit bg-gradient-to-r bg-clip-text
					text-3xl font-bold text-transparent lg:text-4xl"
			>
				Merhaba, {profile?.data?.first_name || "Kullanıcı"}{" "}
				<span className="text-primary">👋</span>
			</h1>
			<h2 className="text-sm">Diyabet takip yolculuğunuza devam edin...</h2>
		</hgroup>
	);
}
