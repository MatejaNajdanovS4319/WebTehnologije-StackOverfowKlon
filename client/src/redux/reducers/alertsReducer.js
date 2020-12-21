import types from '../actions/types';

const { SHOW_ALERT, HIDE_ALERT } = types;

const initialState = {
  msg: '',
  isDisplayed: false,
};

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT: {
      return {
        ...state,
        msg: action.payload,
        isDisplayed: true,
      };
    }
    case HIDE_ALERT: {
      return {
        ...state,
        msg: '',
        isDisplayed: false,
      };
    }
    default: return state
  }
};
export default alertsReducer