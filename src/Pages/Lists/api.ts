import axios from 'axios';
import toast from 'react-hot-toast';
axios.defaults.baseURL = 'https://be-ready-api.vercel.app';
export const getTours = async () => {
  try {
    const resp = await axios.get(`/tours`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
};
interface IToggleEquipItemType {
  tourId: string;
  equipItemId: string;
}

export const getToursById = async (tripId: string) => {
  try {
    const resp = await axios.get(`/tours/${tripId}`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
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
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
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
    const resp = await axios.post(`/tours/newAdd`, newTripData, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
};
interface IAddNewUserToTrip {
  tripId: string;
  userId: string;
}
export const addUserToTrip = async ({ tripId, userId }: IAddNewUserToTrip) => {
  try {
    const resp = await axios.post(
      `/tours/${tripId}/addUser`,
      {
        usersId: userId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
};

interface IUpdateList {
  equipId: string;
  newList: any;
}

export const updateList = async (data: IUpdateList) => {
  try {
    const resp = await axios.post(
      `/equipList/${data.equipId}/update`,
      data.newList,
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
};
