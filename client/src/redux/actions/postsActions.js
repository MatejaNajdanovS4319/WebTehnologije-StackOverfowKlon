import actionTypes from './types';
import { axiosHeaders, axiosCall } from './axiosUtils';

const {
  GET_15_POSTS,
  POSTS_ERROR,
  LOADING_POSTS_TRUE,
  LIKE_POST,
  DISLIKE_POST,
  SEARCH_POSTS,
  POST_DELETE,
  CREATE_POST,
  GET_POST_COMMENTS,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  COMMENT_POST,
  COMMENT_DELETE,
  GET_POST_COMMENTS_ONLY_POST,
} = actionTypes;

export const get15Posts = (numPage) => async (dispatch) => {
  let obj = {
    numPage,
  };
  dispatch({
    type: LOADING_POSTS_TRUE,
  });
  obj = JSON.stringify(obj);
  try {
    const res = await axiosHeaders.post('/posts/get15', obj);
    if (res.data.msg) {
      return dispatch({ type: POSTS_ERROR, payload: res.msg });
    }
    dispatch({
      type: GET_15_POSTS,
      payload: res.data.posts,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: err,
    });
  }
};
export const postLoading = () => (dispatch) => {
  dispatch({
    type: LOADING_POSTS_TRUE,
  });
};
export const likePost = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Barer ${token}`,
      },
    };
    const res = await axiosCall.put(`posts/like/${id}`, null, config);
    const post = res.data.post;
    const payload = {
      id,
      post,
    };
    dispatch({
      type: LIKE_POST,
      payload,
    });
  } catch (err) {}
};

export const dislikePost = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    const res = await axiosCall.put(`posts/dislike/${id}`, null, config);
    const post = res.data.post;
    const payload = {
      id,
      post,
    };
    dispatch({
      type: DISLIKE_POST,
      payload,
    });
  } catch (err) {}
};

export const searchPosts = (searchString) => async (dispatch) => {
  try {
    let string = {
      searchString,
    };
    dispatch({
      type: LOADING_POSTS_TRUE,
    });
    string = JSON.stringify(string);
    const res = await axiosHeaders.post('/posts/search', string);
    dispatch({
      type: SEARCH_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
    });
  }
};
export const deletePost = (postId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    dispatch({
      type: LOADING_POSTS_TRUE,
    });
    await axiosHeaders.delete(`posts/${postId}`, config);
    dispatch({
      type: POST_DELETE,
      payload: postId,
    });
  } catch (error) {}
};
export const createPost = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_POSTS_TRUE,
    });
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    let form = {
      subject: data.subject,
      text: data.text,
    };
    form = JSON.stringify(form);
    const res = await axiosHeaders.post('/posts', form, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data.post,
    });
  } catch (err) {}
};

// COMMENTS FUNCIONALITY
export const getComments = (id) => async (dispatch) => {
  try {
    const res = await axiosCall.get(`/comments/${id}`);
    if (res.data.post.comments.length > 0)
      return dispatch({
        type: GET_POST_COMMENTS,
        payload: res.data,
      });
    dispatch({
      type: GET_POST_COMMENTS_ONLY_POST,
      payload: res.data,
    });
  } catch (err) {}
};

export const commentPost = (postId, form) => async (dispatch) => {
  try {
    dispatch({
      type: LOADING_POSTS_TRUE,
    });
    const config = {
      headers: {
        Authorization: `Barer ${localStorage.getItem('token')}`,
      },
    };
    let data = {
      text: form,
    };
    data = JSON.stringify(data);
    const res = await axiosHeaders.post(`/comments/${postId}`, data, config);
    dispatch({
      type: COMMENT_POST,
      payload: res.data,
    });
  } catch (err) {}
};
export const likeComment = (postId, commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Barer ${token}`,
      },
    };
    const res = await axiosCall.put(
      `comments/like/${postId}/${commentId}`,
      null,
      config
    );
    dispatch({
      type: LIKE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error)
  }
};
export const dislikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Barer ${token}`,
      },
    };
    const res = await axiosCall.put(
      `comments/dislike/${postId}/${commentId}`,
      null,
      config
    );
    dispatch({
      type: DISLIKE_COMMENT,
      payload: res.data,
    });
  } catch (error) {
  }
};
export const deleteComment = (postId, commentId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Barer ${localStorage.getItem('token')}`,
    },
  };
  dispatch({
    type: LOADING_POSTS_TRUE,
  });
  await axiosHeaders.delete(`/comments/${postId}/${commentId}`, config);
  dispatch({
    type: COMMENT_DELETE,
    payload: commentId,
  });
}