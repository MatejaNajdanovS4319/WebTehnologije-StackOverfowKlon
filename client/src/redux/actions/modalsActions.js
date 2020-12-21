import types from './types';

const { MESSAGE_MODAL_HIDE, MESSAGE_MODAL_SHOW } = types;

export const messsageModalShow = (from, text) => {
  const data = {
    from,
    text,
  };
  return {
    type: MESSAGE_MODAL_SHOW,
    payload: data,
  };
};

export const messsageModalHide = () => {
  return {
    type: MESSAGE_MODAL_HIDE,
  };
};
