import { createSlice } from "@reduxjs/toolkit";
import type { Session } from "@supabase/supabase-js";

type AuthState = {
	session: Session | null;
};

const initialState: AuthState = {
	session: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.session = action.payload;
		},
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
