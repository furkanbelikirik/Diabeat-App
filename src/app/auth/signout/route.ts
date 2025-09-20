"use server";

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
	const supabase = await createClient();

	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			await supabase.auth.signOut();
		} else {
			throw new Error("Kullanıcı Bulunamadı");
		}

		revalidatePath("/");
		return NextResponse.redirect(new URL("/login", request.url), {
			status: 302,
		});
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	return NextResponse.redirect(new URL("/login", request.url), {
		status: 302,
	});
}
