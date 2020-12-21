import types from './types';
import { axiosCall, axiosHeaders } from './axiosUtils';
const {
  LOGIN,
  LOGIN_ERROR,
  REGISTER,
  REGISTER_ERROR,
  CHECK_PROFILE,
  LOG_OUT,
  GET_PROFILE,
  LOADING_PROFILE_TRUE,
  GET_MESSAGEES,
  GET_SENT_MESSAGES,
  VIEW_MESSAGE,
  SHOW_ALERT,
  HIDE_ALERT,
} = types;

export const logIn = (form) => async (dispatch) => {
  const data = JSON.stringify(form);
  try {
    const res = await axiosHeaders.post('/auth/login', data);
    if (res.data.error) {
      dispatch({
        type: SHOW_ALERT,
        payload: res.data.error,
      });
      return setTimeout(() => {
        dispatch({
          type: HIDE_ALERT,
        });
      }, 5000);
    }
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: SHOW_ALERT,
      payload: 'Wrong credentials',
    });
    dispatch({
      type: LOGIN_ERROR,
    });
  }
};
export const signUp = (form) => async (dispatch) => {
  const data = JSON.stringify(form);
  try {
    const res = await axiosHeaders.post('/auth/register', data);
    if (res.data.error) {
      dispatch({
        type: SHOW_ALERT,
        payload: res.data.error,
      });
      return setTimeout(() => {
        dispatch({
          type: HIDE_ALERT,
        });
      }, 5000);
    }
    if (res.data.error) {
      return dispatch({
        type: REGISTER_ERROR,
        payload: res.data.error,
      });
    }
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_ERROR,
      payload: 'Server error',
    });
  }
};
export const checkProfile = (token) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Barer ${token}`,
    },
  };
  try {
    const res = await axiosHeaders.get('/auth', config);
    if (res.data.error) {
      dispatch({
        type: SHOW_ALERT,
        payload: res.data.error,
      });
      return setTimeout(() => {
        dispatch({
          type: HIDE_ALERT,
        });
      }, 5000);
    }
    dispatch({
      type: CHECK_PROFILE,
      payload: res.data,
    });
  } catch (error) {}
};
export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT,
  });
};
export const loadingProfileTrue = () => (dispatch) => {
  dispatch({
    type: LOADING_PROFILE_TRUE,
  });
};
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await axiosCall.get(`/profile/${id}`);
    if (res.data.error) {
      dispatch({
        type: SHOW_ALERT,
        payload: res.data.error,
      });
      return setTimeout(() => {
        dispatch({
          type: HIDE_ALERT,
        });
      }, 5000);
    }
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {}
};
export const sendMessage = (id, form) => async (dispatch) => {
  try {
    let text = {
      text: form,
    };
    text = JSON.stringify(text);
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosHeaders.post(
      `/messages/sendMessage/${id}`,
      text,
      config
    );
    dispatch({
      type: SHOW_ALERT,
      payload: res.data.error,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  } catch (err) {
    dispatch({
      type: SHOW_ALERT,
      payload: err.data.error,
    });
    return setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 5000);
  }
};
export const getMessages = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosHeaders.get('/messages', config);
    dispatch({
      type: GET_MESSAGEES,
      payload: res.data,
    });
  } catch (err) {}
};
export const getSentMessages = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosHeaders.get('/messages/sent', config);
    dispatch({
      type: GET_SENT_MESSAGES,
      payload: res.data,
    });
  } catch (err) {}
};
export const viewMessage = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosCall.put(
      `/messages/viewMessage/${id}`,
      null,
      config
    );
    console.log(res.data);
    dispatch({
      type: VIEW_MESSAGE,
      payload: id,
    });
  } catch (err) {}
};
