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

export const renameTrip = async ({
  newName,
  tripId,
}: {
  newName: string;
  tripId: string;
}) => {
  try {
    const reps = await axios.post(
      `/tours/${tripId}/rename`,
      {
        name: newName,
      },
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return reps.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
};
export const changeDuration = async ({
  duration,
  tripId,
}: {
  duration: number;
  tripId: string;
}) => {
  try {
    const resp = await axios.post(
      `/tours/${tripId}/changeDuration`,
      {
        duration,
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

export const deleteTrip = async ({ tripId }: { tripId: string }) => {
  try {
    const resp = await axios.delete(`/tours/${tripId}`, {
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

export interface IAddNewCategory {
  listId: string;
  categoryName: string;
}

export const addNewCategory = async ({
  listId,
  categoryName,
}: IAddNewCategory) => {
  try {
    const resp = await axios.post(
      `/equipList/${listId}/addNewCategory`,
      {
        name: categoryName,
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

export interface IAddNewItemToCategory {
  listId: string;
  itemData: {
    category: string;
    name: string;
    description: string;
  };
}

export const addNewItemToCategory = async ({
  listId,
  itemData,
}: IAddNewItemToCategory) => {
  try {
    const resp = await axios.post(`/equipList/${listId}/addNewItem`, itemData, {
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

export const getFriendsTripRequests = async(tripId: string) => {
  try {
    const resp = await axios.get(`/auth/friendsTripRequests/${tripId}`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error:any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
}
