import axios from 'axios';
import toast from 'react-hot-toast';
import {
  IAddNewCategoryType,
  IAddNewItemToCategoryType,
  IAddNewUserToTripType,
  IChangeDurationType,
  IDeleteCategoryType,
  IDeleteListItemType,
  IDeleteTripType,
  IErrorAlertType,
  INewTripType,
  IRenameTripType,
  IToggleEquipItemType,
  IUpdateCountType,
  IUpdateListType,
} from '../../Types/api/lists';
axios.defaults.baseURL = 'https://be-ready-api.vercel.app';

export const ErrorAlert = ({ errorCode, message }: IErrorAlertType) => {
  if (errorCode === 401) {
    toast.error('Потрібно авторизуватися');
  } else {
    toast.error(message);
  }
};
export const getTours = async () => {
  try {
    const resp = await axios.get(`/tours`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const getToursById = async (tripId: string) => {
  try {
    const resp = await axios.get(`/tours/${tripId}`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const renameTrip = async ({ newName, tripId }: IRenameTripType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};
export const changeDuration = async ({
  duration,
  tripId,
}: IChangeDurationType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const deleteTrip = async ({ tripId }: IDeleteTripType) => {
  try {
    const resp = await axios.delete(`/tours/${tripId}/delete`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const createNewTour = async (newTripData: INewTripType) => {
  try {
    const resp = await axios.post(`/tours/newAdd`, newTripData, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const addUserToTrip = async ({
  tripId,
  userId,
  invite,
}: IAddNewUserToTripType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const addNewCategory = async ({
  listId,
  categoryName,
}: IAddNewCategoryType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const addNewItemToCategory = async ({
  listId,
  itemData,
}: IAddNewItemToCategoryType) => {
  try {
    const resp = await axios.post(`/equipList/${listId}/addNewItem`, itemData, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const updateList = async (data: IUpdateListType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const deleteCategory = async ({
  listId,
  categoryName,
}: IDeleteCategoryType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const deleteListItem = async ({
  listId,
  itemId,
  category,
}: IDeleteListItemType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};

export const updateCount = async ({
  listId,
  count,
  category,
  equipId,
}: IUpdateCountType) => {
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ErrorAlert({
        errorCode: error?.response?.status,
        message: error?.response?.data,
      });
    } else {
      console.error(error);
    }
  }
};
