import types from '../actions/types';

const { MESSAGE_MODAL_SHOW, MESSAGE_MODAL_HIDE } = types;

const initialState = {
  isShown: false,
  from: '',
  text: '',
};

const modalsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case MESSAGE_MODAL_SHOW: {
      return {
        ...state,
        isShown: true,
        from: payload.from,
        text: payload.text,
      };
    }
    case MESSAGE_MODAL_HIDE: {
      return {
        ...state,
        isShown: false,
        from: '',
        text: '',
      };
    }
    default:
      return state;
  }
};

export default modalsReducer;
