import axios from "axios";
axios.defaults.baseURL = "https://be-ready-api.vercel.app";
const token = localStorage.getItem("token");
export const getTours = async () => {
	try {
		const resp = await axios.get(`/tours`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
interface IToggleEquipItemType {
	tourId: string;
	equipItemId: string;
}

export const getToursById = async (tripId: string, filtered: boolean) => {
	try {
		const resp = await axios.get(`/tours/${tripId}/?filtered=${filtered}`, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
export const toggleEquipItemCheck = async ({
	tourId,
	equipItemId,
}: IToggleEquipItemType) => {
	try {
		const resp = await axios.patch(
			`/tours/${tourId}/updateItem`,
			{
				equipId: equipItemId,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			},
		);
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
interface INewTripData {
	name: string;
	listType: number;
	duration: number;
}
export const createNewTour = async (newTripData: INewTripData) => {
	try {
		const resp = await axios.post(`/tours/add`, newTripData, {
			headers: {
				Authorization: "Bearer " + token,
			},
		});
		return resp.data;
	} catch (error) {
		console.log(error);
	}
};
