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
    const resp = await axios.delete(`/tours/${tripId}/delete`, {
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
  customData: string;
}
export const createNewTour = async (newTripData: INewTripData) => {
  try {
    const resp = await axios.post(
      `http://localhost:8080/tours/newAdd`,
      newTripData,
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
interface IAddNewUserToTrip {
  tripId: string;
  userId: string;
  invite: boolean;
}
export const addUserToTrip = async ({
  tripId,
  userId,
  invite,
}: IAddNewUserToTrip) => {
  try {
    const resp = await axios.post(
      `/tours/${tripId}/addUser?invite=${invite}`,
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

export const getFriendsTripRequests = async (tripId: string) => {
  try {
    const resp = await axios.get(`/auth/friendsTripRequests/${tripId}`, {
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

export const getUsersInTrips = async (tripId: string) => {
  try {
    const resp = await axios.get(`/tours/${tripId}/usersInfo`, {
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
export interface IDeleteCategoryProps {
  listId: string;
  categoryName: string;
}
export const deleteCategory = async ({
  listId,
  categoryName,
}: IDeleteCategoryProps) => {
  try {
    const resp = await axios.post(
      `equipList/${listId}/deleteCategory`,
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
export interface IDeleteListItemProps {
  listId: string;
  itemId: string;
  category: string;
}
export const deleteListItem = async ({
  listId,
  itemId,
  category,
}: IDeleteListItemProps) => {
  try {
    const resp = await axios.post(
      `equipList/${listId}/deleteItem`,
      {
        itemid: itemId,
        category: category,
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
export interface IUpdateCountProps {
  listId: string;
  count: number;
  category: string;
  equipId: string;
}
export const updateCount = async ({
  listId,
  count,
  category,
  equipId,
}: IUpdateCountProps) => {
  try {
    const resp = await axios.post(
      `equipList/${listId}/updateCount`,
      {
        count: count,
        category: category,
        equipId: equipId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const downloadList = async (listId: string) => {
  try {
    const resp = await axios.get(`/equipList/${listId}/downloadList`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
