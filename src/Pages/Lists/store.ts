import { create } from "zustand";
import axios from "axios";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
axios.defaults.baseURL = "https://be-ready-api.vercel.app/";
export interface ITrips {
	id: string;
	name: string;
	users: string[];
	period: string;
	equipList: any[];
}
export interface INewTrip {
	name: string;
	dyration: number;
	listType: number;
}
// export interface ILogin {
// 	email: string;
// 	password: string;
// }
// export interface IState {
// 	user: IUser;
// 	token: string;
// 	isLoading: boolean;
// 	error: string | undefined;
// }
const userStore = JSON.parse(localStorage.getItem("user-storage")!);

console.log(userStore);

export const useTrips = create(
	devtools(
		persist(
			(set: any, get: any) => ({
				trips: [],
				getTrips: async () => {
					set(() => ({ IsLoading: true }));
					try {
						// const userLocalStorage = localStorage.getItem("user-storage");
						// if (userLocalStorage) {
						// }
						console.log(userStore.state.token);
						const resp = await axios.get(`/tours`, {
							headers: {
								Authorization: "Bearer " + userStore.state.token,
							},
						});
						// const resp = await axios.get(`/start`);
						// set(() => ({
						// 	user: resp.data.user,
						// 	token: resp.data.token,
						// }));
						set(() => ({
							trips: resp.data,
						}));
						console.log(resp);
					} catch (error: any) {
						set(() => ({ error: error.message }));
					} finally {
						set(() => ({ isLoading: false }));
					}
				},
				createTrip: async (newTrip: INewTrip) => {
					set(() => ({ isLoading: true }));
					try {
						const resp = await axios.post(`/tours/add`, newTrip, {
							headers: {
								Authorization: "Bearer " + userStore.state.token,
							},
						});
						console.log(resp.data);
						if (resp.status === 200) {
							get().getTrips();
						}
					} catch (error: any) {
						set(() => ({ error: error.message }));
					} finally {
						set(() => ({ isLoading: false }));
					}
				},
			}),
			{
				name: "lists-storage",
				storage: createJSONStorage(() => localStorage),
			},
		),
	),
);
