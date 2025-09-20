import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { getUserDataApi } from "./features/userData/userDataSlice";

export const makeStore = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			[getUserDataApi.reducerPath]: getUserDataApi.reducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(getUserDataApi.middleware),
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
