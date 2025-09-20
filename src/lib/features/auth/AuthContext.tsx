"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { createClient } from "@/utils/supabase/client";
import { setAuth } from "./authSlice";

export default function AuthContext({ children }: { children: React.ReactNode }) {
	const dispatch = useAppDispatch();
	const supabase = createClient();

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			dispatch(setAuth(session ? session : null));
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			dispatch(setAuth(session ? session : null));
		});

		return () => subscription.unsubscribe();
	}, [dispatch, supabase.auth]);

	return <>{children} </>;
}
