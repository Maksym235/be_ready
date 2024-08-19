import axios from "axios";

interface ILogin {
	email: string;
	password: string;
}

// axios.defaults.baseURL = "http://localhost:8080/auth";

export const loginAsync = async ({ email, password }: ILogin) => {
	try {
		const resp = await axios.get("http://localhost:8080/auth/login", {
			auth: {
				username: email,
				password: password,
			},
		});
		window.localStorage.setItem("token", resp.data.token);
		window.localStorage.setItem("user", JSON.stringify(resp.data.user));
		window.localStorage.setItem("theme", resp.data.user.theme);
		window.localStorage.setItem("lang", resp.data.user.language);
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
