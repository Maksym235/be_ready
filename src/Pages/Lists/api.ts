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
  UpdateNameType,
} from '../../Types/api/lists';
import { QueryDataType } from '../../Types/Components/SelectedLists';
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

    return resp.data as QueryDataType;
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
    const toastId = toast.loading('Renaming...');
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
    toast.success('Renamed!', { id: toastId });
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
    const toastId = toast.loading('Changing...');
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
    toast.success('Changed!', { id: toastId });
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
    const toastId = toast.loading('Creating list...');
    const resp = await axios.post(`/tours/newAdd`, newTripData, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    toast.success('list created!', { id: toastId });
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
    const toastId = toast.loading('Creating new category...');
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
    toast.success('Category created', { id: toastId });
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
    const toastId = toast.loading('Adding new item...');
    const resp = await axios.post(`/equipList/${listId}/addNewItem`, itemData, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    toast.success('Item added', { id: toastId });
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
    const toastId = toast.loading('Deleting category...');
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
    toast.success('Deleted', { id: toastId });
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
    const toastId = toast.loading('Deleting item...');
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
    toast.success('Deleted', { id: toastId });
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

export const updateName = async ({
  listId,
  name,
  category,
  equipId,
}: UpdateNameType) => {
  try {
    const toastId = toast.loading('Updating item...');
    const resp = await axios.post(
      `equipList/${listId}/updateName`,
      {
        equipId,
        name,
        category,
      },
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    toast.success('Updated success!', { id: toastId });
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
