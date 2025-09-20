"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function logIn(
	_prevState: {
		message: string;
		success: boolean;
	} | null,
	formData: FormData,
) {
	const supabase = await createClient();

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	try {
		const { error } = await supabase.auth.signInWithPassword(data);

		if (error) {
			return {
				message: error.message,
				success: false,
			};
		}

		revalidatePath("/dashboard");

		return {
			message: "Giriş Yapıldı",
			success: true,
		};
	} catch (error) {
		console.log(error);
		return {
			message: "Giriş Yapılamadı",
			success: false,
		};
	}
}
