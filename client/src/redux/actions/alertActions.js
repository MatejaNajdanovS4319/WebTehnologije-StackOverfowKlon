import types from './types';

const { HIDE_ALERT, SHOW_ALERT } = types;

export const showAlert = (msg) => {
  return {
    type: SHOW_ALERT,
    payload: msg,
  };
};
export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};
