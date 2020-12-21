import actionTypes from '../actions/types';
import { normalizeArray } from '../../utils';

const {
  GET_15_POSTS,
  POSTS_ERROR,
  LOADING_POSTS_TRUE,
  LIKE_POST,
  DISLIKE_POST,
  SEARCH_POSTS,
  POST_DELETE,
  CREATE_POST,
  COMMENT_POST,
  GET_POST_COMMENTS,
  LIKE_COMMENT,
  GET_POST_COMMENTS_ONLY_POST,
  DISLIKE_COMMENT,
  COMMENT_DELETE,
} = actionTypes;

const initialState = {
  posts: {
    allIds: [],
    byIds: {},
  },
  comments: {
    post: {},
    allIds: [],
    byIds: {},
  },
  loading: true,
};

const postsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_15_POSTS:
      const normalized = normalizeArray(payload);
      return {
        ...state,
        posts: {
          allIds: [...state.posts.allIds, ...normalized.allIds],
          byIds: { ...state.posts.byIds, ...normalized.byIds },
        },
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LIKE_POST: {
      return {
        ...state,
        posts: {
          ...state.posts,
          byIds: {
            ...state.posts.byIds,
            [payload.id]: payload.post,
          },
        },
        loading: false,
        comments: {
          ...state.comments,
          post: {
            ...state.comments.post,
            ...payload.post
          }
        }
      };
    }
    case DISLIKE_POST: {
      return {
        ...state,
        posts: {
          ...state.posts,
          byIds: {
            ...state.posts.byIds,
            [payload.id]: payload.post,
          },
        },
        comments: {
          ...state.comments,
          post: {
            ...state.comments.post,
            ...payload.post
          }
        },
        loading: false
      };
    }
    case SEARCH_POSTS: {
      const normalized = normalizeArray(payload.searchedPosts);
      return {
        ...state,
        posts: normalized,
        loading: false,
      };
    }
    case POST_DELETE: {
      let a = payload;
      const { [a]: b, ...rest } = state.posts.byIds;
      return {
        ...state,
        posts: {
          ...state.posts,
          byIds: {
            ...rest,
          },
          allIds: [
            ...state.posts.allIds.filter((postId) => postId !== payload),
          ],
        },
        loading: false,
      };
    }
    case CREATE_POST: {
      return {
        ...state,
        posts: {
          allIds: [payload._id, ...state.posts.allIds],
          byIds: {
            [payload._id]: payload,
            ...state.posts.byIds,
          },
        },
        loading: false,
      };
    }
    case LOADING_POSTS_TRUE: {
      return {
        ...state,
        loading: true,
      };
    }
    case COMMENT_POST:
    case GET_POST_COMMENTS: {
      const a = normalizeArray(payload.post.comments);
      return {
        ...state,
        comments: {
          post: {
            ...payload.post,
          },
          ...a,
        },
        loading: false,
      };
    }
    case GET_POST_COMMENTS_ONLY_POST: {
      return {
        ...state,
        comments: {
          ...payload,
          byIds:{},
          allIds:[]
        },
        loading: false,
      };
    }
    case LIKE_COMMENT: {
      const b = normalizeArray(payload.post.comments)
      return {
        ...state,
        comments: {
          ...state.comments,
          post: {
            ...payload.post
          },
          ...b
        },
        loading: false
      }
    }
    case DISLIKE_COMMENT: {
      const c = normalizeArray(payload.post.comments)
      return {
        ...state,
        comments: {
          ...state.comments,
          post: {
            ...payload.post
          },
          ...c
        },
        loading: false
      }
    }
    case COMMENT_DELETE: {
      const comDeltedIds = state.comments.allIds.filter(id => {
        return id!==payload;
      })
      console.log(comDeltedIds)
      const { [payload]: b, ...rest } = state.comments.byIds;
      return {
        ...state,
        comments: {
          ...state.comments,
          byIds: {
            ...rest
          },
          allIds: [
            ...comDeltedIds
          ]
        },
        loading:false
      }
    }
    default:
      return state;
  }
};
export default postsReducer;
