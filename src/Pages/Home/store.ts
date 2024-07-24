import { create } from "zustand";
import axios from "axios";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
axios.defaults.baseURL = "https://be-ready-api.vercel.app/";
export interface IUser {
	id: string;
	name: string;
	email: string;
	language: string;
	theme: string;
}
export interface ILogin {
	email: string;
	password: string;
}
export interface IState {
	user: IUser;
	token: string;
	isLoading: boolean;
	error: string | undefined;
}
export const useAuth = create(
	devtools(
		persist(
			(set, get) => ({
				user: {
					id: "",
					name: "",
					email: "",
					language: "",
					theme: "",
				},
				token: null,
				isLoading: false,
				error: "",

				login: async (loginData: ILogin) => {
					// const user = {
					// 	id: "",
					// 	name: "",
					// 	email: loginData.email,
					// 	language: "",
					// 	theme: "",
					// };
					set(() => ({ IsLoading: true }));
					try {
						const userLocalStorage = localStorage.getItem("user-storage");
						// if (userLocalStorage) {
						// }
						const resp = await axios.post(`/auth/login`, loginData);
						// const resp = await axios.get(`/start`);
						set(() => ({
							user: resp.data.user,
							token: resp.data.token,
						}));
						console.log(resp);
					} catch (error: any) {
						set(() => ({ error: error.message }));
					} finally {
						set(() => ({ isLoading: false }));
					}
				},
			}),
			{
				name: "user-storage",
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
