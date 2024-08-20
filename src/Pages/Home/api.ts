import axios from "axios";

interface ILogin {
	email: string;
	password: string;
}

// axios.defaults.baseURL = "http://localhost:8080/auth";

export const loginAsync = async ({ email, password }: ILogin) => {
	try {
		const resp = await axios.get("https://be-ready-api.vercel.app/auth/login", {
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
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};

export const getCurrent = async () => {
	try {
		const resp = await axios.get(
			"https://be-ready-api.vercel.app/auth/current",
			{
				headers: {
					Authorization: "Bearer " + window.localStorage.getItem("token"),
				},
			},
		);
		localStorage.setItem("token", resp.data.token);
		localStorage.setItem("isLoggedIn", JSON.stringify(true));
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
