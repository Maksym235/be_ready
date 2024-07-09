import { create } from "zustand";
import axios from "axios";
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
export const useAuth = create((set, get) => ({
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

	login: (loginData: ILogin) => {
		const user = {
			id: "",
			name: "",
			email: loginData.email,
			language: "",
			theme: "",
		};
		set(() => ({ user: user }));
		// try {
		// 	const resp = await axios.get(``);
		// } catch (error) {}
	},
}));
