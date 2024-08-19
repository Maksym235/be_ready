import axios from "axios";
// axios.defaults.baseURL = "http://localhost:8080";
export const getTours = async () => {
	try {
		const token = localStorage.getItem("token");
		const resp = await axios.get(`http://localhost:8080/tours`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
