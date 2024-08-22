import axios from "axios";
import toast from "react-hot-toast";
interface ILogin {
	email: string;
	password: string;
}

axios.defaults.baseURL = "https://be-ready-api.vercel.app";

export const loginAsync = async ({ email, password }: ILogin) => {
	try {
		const resp = await axios.get("/auth/login", {
			auth: {
				username: email,
				password: password,
			},
		});
		window.localStorage.setItem("token", resp.data.token);
		window.localStorage.setItem("user", JSON.stringify(resp.data.user));
		window.localStorage.setItem("theme", resp.data.user.theme);
		window.localStorage.setItem("lang", resp.data.user.language);
		window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
		if (resp.status === 200) toast.success("Вітаю в системі!");
		return resp.data;
	} catch (error: any) {
		if (error.response.status === 401) toast.error("Потрібно авторизуватися");
		toast.error(error.message);
		console.log(error);
	}
};

export const getCurrent = async () => {
	try {
		const resp = await axios.get("/auth/current", {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		});
		localStorage.setItem("token", resp.data.token);
		localStorage.setItem("isLoggedIn", JSON.stringify(true));

		return resp.data;
	} catch (error: any) {
		if (error.response.status === 401) toast.error("Потрібно авторизуватися");
		console.log(error);
	}
};

export const getUserRequests = async () => {
	try {
		const resp = await axios.get(`/auth/getRequests`, {
			headers: {
				Authorization: "Bearer " + window.localStorage.getItem("token"),
			},
		});
		return resp.data;
	} catch (error: any) {
		if (error.response.status === 401) toast.error("Потрібно авторизуватися");
		console.log(error);
	}
};
interface IEditRequest {
	tripId: string;
	accept: boolean;
}
export const editRequest = async ({ tripId, accept }: IEditRequest) => {
	try {
		const resp = await axios.get(
			`/auth/editRequest/${tripId}/?accept=${accept}`,
			{
				headers: {
					Authorization: "Bearer " + window.localStorage.getItem("token"),
				},
			},
		);
		return resp.data;
	} catch (error: any) {
		if (error.response.status === 401) toast.error("Потрібно авторизуватися");
		console.log(error);
	}
};

export const getUsersById = async (usersIds: string) => {
	try {
		const resp = await axios.post(
			`/auth/getById`,
			{
				ids: usersIds,
			},
			{
				headers: {
					Authorization: "Bearer " + window.localStorage.getItem("token"),
				},
			},
		);
		return resp.data;
	} catch (error: any) {
		if (error.response.status === 401) toast.error("Потрібно авторизуватися");
		console.log(error);
	}
};
