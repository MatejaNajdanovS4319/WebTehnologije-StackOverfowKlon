import actionTypes from '../actions/types';
import { normalizeArray } from '../../utils';

const {
  LOGIN,
  REGISTER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  CHECK_PROFILE,
  LOADING_PROFILE_TRUE,
  LOG_OUT,
  GET_PROFILE,
  GET_MESSAGEES,
  GET_SENT_MESSAGES,
  VIEW_MESSAGE,
} = actionTypes;

const initialState = {
  token: {},
  profile: {
    messages: {
      byIds: {},
      allIds: [],
    },
    sentMessages: {
      byIds: {},
      allIds: [],
    },
  },
  loading: true,
  error: {},
  profileToView: {},
  isAuthenticated: false,
  isViewed: false,
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHECK_PROFILE:
      const { profile, isViewed } = payload;
      return {
        ...state,
        token: localStorage.getItem('token'),
        profile: {
          ...state.profile,
          ...profile,
        },
        error: {},
        loading: false,
        isAuthenticated: true,
        isViewed,
      };
    case LOGIN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        profile: {
          ...state.profile,
          ...payload.profileToSend,
        },
        loading: false,
        error: {},
        isAuthenticated: true,
      };
    case REGISTER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        profile: {
          ...state.profile,
          ...payload.profile
        },
        loading: false,
        isAuthenticated: true,
      };
    case LOADING_PROFILE_TRUE:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: {},
        profile: {
          messages: {
            byIds: {},
            allIds: [],
          },
          sentMessages: {
            byIds: {},
            allIds: [],
          },
        },
        error: payload,
        isAuthenticated: false,
      };
    case LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: {},
        profile: {
          messages: {
            byIds: {},
            allIds: [],
          },
          sentMessages: {
            byIds: {},
            allIds: [],
          },
        },
        isAuthenticated: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profileToView: payload.profile,
      };
    case GET_MESSAGEES:
      const a = normalizeArray(payload.messages.messages);
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          messages: {
            allIds: [...a.allIds],
            byIds: { ...a.byIds },
          },
        },
      };
    case GET_SENT_MESSAGES:
      const b = normalizeArray(payload.messages.sentMessages);
      return {
        ...state,
        loading: false,
        profile: {
          ...state.profile,
          sentMessages: {
            allIds: [...b.allIds],
            byIds: { ...b.byIds },
          },
        },
      };
    case VIEW_MESSAGE:
      return {
        ...state,
        profile: {
          ...state.profile,
          messages: {
            ...state.profile.messages,
            byIds: {
              ...state.profile.messages.byIds,
              [payload]: {...state.profile.messages.byIds[payload], isViewed:true}
            }
          }
        }
      }
    default:
      return state;
  }
};

export default profileReducer;
