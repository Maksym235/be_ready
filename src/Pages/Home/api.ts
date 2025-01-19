import axios from 'axios';
import toast from 'react-hot-toast';
import {
  IEditRequest,
  IEditRequestData,
  ILogin,
  IRegisterGoogleAuth,
  IUserDataToUpdate,
} from '../../Types/api/home';

axios.defaults.baseURL = 'https://be-ready-api.vercel.app';
// const setAuthHeader = (token: string) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const unSetAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = '';
// };
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('googleUser');
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};

export const updateUserData = async (data: IUserDataToUpdate) => {
  try {
    const resp = await axios.post(`/auth/update`, data, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      toast.error(error.message);
    } else {
      console.error(error);
    }
  }
};

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      toast.error(error.response?.data);
    } else {
      console.error(error);
    }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      toast.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};

export const changeAvatar = async (data: unknown) => {
  try {
    const resp = await axios.patch('/auth/avatars', data, {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      toast.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};

export const resetToDefaultAvatar = async () => {
  try {
    const resp = await axios.get('/auth/resetAvatars', {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    });
    return resp.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
      toast.error(error.response?.data);
    } else {
      console.error(error);
    }
  }
};
