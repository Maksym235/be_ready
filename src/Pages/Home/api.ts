import axios from 'axios';
import toast from 'react-hot-toast';
interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterGoogleAuth {
  name: string;
  email: string;
  avatarURL: string;
  avatarName: string;
  password: string;
}

axios.defaults.baseURL = 'https://be-ready-api.vercel.app';

export const loginAsync = async ({ email, password }: ILogin) => {
  try {
    const resp = await axios.get('/auth/login', {
      auth: {
        username: email,
        password: password,
      },
    });
    window.localStorage.setItem('token', resp.data.token);
    window.localStorage.setItem('user', JSON.stringify(resp.data.user));
    window.localStorage.setItem('theme', resp.data.user.theme);
    window.localStorage.setItem('lang', resp.data.user.language);
    window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
    if (resp.status === 200) toast.success('Вітаю в системі!');
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    toast.error(error.message);
    console.log(error);
  }
};
export const googleAuth = async ({
  name,
  email,
  avatarName,
  avatarURL,
  password,
}: IRegisterGoogleAuth) => {
  try {
    const resp = await axios.post('/auth/googleAuth', {
      name,
      email,
      avatarName,
      avatarURL,
      password,
    });
    window.localStorage.setItem('token', resp.data.token);
    window.localStorage.setItem('user', JSON.stringify(resp.data.user));
    window.localStorage.setItem('theme', resp.data.user.theme);
    window.localStorage.setItem('lang', resp.data.user.language);
    window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
    if (resp.status === 200) toast.success('Вітаю в системі!');
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    toast.error(error.message);
    console.log(error);
  }
};

export const userLogout = async () => {
  try {
    const resp = await axios.post(
      `/auth/logout`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    if (resp.status === 200) {
      toast.success('До зустрічі!');
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('googleUser');
    }
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCurrent = async () => {
  try {
    const resp = await axios.get('/auth/current', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    localStorage.setItem('token', resp.data.token);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    localStorage.setItem('user', JSON.stringify(resp.data.user));
    return resp.data;
  } catch (error: any) {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('googleUser');
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
  }
};

export const getUserRequests = async () => {
  try {
    const resp = await axios.get(`/auth/getRequests`, {
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

export const getUsersById = async (usersIds: string) => {
  try {
    const resp = await axios.post(
      `/auth/getById`,
      {
        ids: usersIds,
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
interface IUserDataToUpdate {
  name: string;
  email: string;
  curPassword: string;
  password: string;
}
export const updateUserData = async (data: IUserDataToUpdate) => {
  try {
    const resp = await axios.post(`/auth/update`, data, {
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

export const sendFriendRequest = async (userId: string) => {
  try {
    const resp = await axios.post(
      '/auth/frreq',
      {
        userid: userId,
      },
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
};
export interface IEditRequestData {
  reqId: string;
  isAccept: boolean;
}
export const editFriendRequest = async ({
  reqId,
  isAccept,
}: IEditRequestData) => {
  try {
    const resp = await axios.get(
      `/auth/editFrRequest/${reqId}?accept=${isAccept}`,
      {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      }
    );
    return resp.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
};

export const deleteFriend = async (friendId: string) => {
  try {
    const resp = await axios.get(`/auth/deleteFriend/${friendId}`, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.message);
  }
};

export const changeAvatar = async (data: any) => {
  try {
    const resp = await axios.patch('/auth/avatars', data, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
    toast.error(error.message);
  }
};

export const resetToDefaultAvatar = async () => {
  try {
    const resp = await axios.get('/auth/resetAvatars', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });
    return resp.data;
  } catch (error: any) {
    if (error.response.status === 401) toast.error('Потрібно авторизуватися');
    console.log(error);
    toast.error(error.message);
  }
};
