import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  dislikePost,
  likePost,
  deletePost,
  postLoading,
  likeComment,
  dislikeComment,
  deleteComment,
} from '../../redux/actions/postsActions';
import { loadingProfileTrue } from '../../redux/actions/profileActions';
import { hideAlert, showAlert } from '../../redux/actions/alertActions';

const Post = ({
  profile: { profile, isAuthenticated },
  postId,
  profileIdProp,
  firstName,
  lastName,
  subject,
  text,
  ratio,
  status,
  role,
  commentId,

  likePost,
  dislikePost,
  deletePost,
  loadingProfileTrue,
  postLoading,
  likeComment,
  dislikeComment,
  deleteComment,
  showAlert,
  hideAlert
}) => {
  const history = useHistory();
  const onDelClick = () => {
    if (role === 'comment') {
      deleteComment(postId, commentId);
    }
    if (role === 'question') {
      deletePost(postId);
      return history.push('/posts');
    }
    deletePost(postId);
  };
  const delButton = () => {
    if (!profile._id) return null;
    return profile._id !== profileIdProp ? null : (
      <button onClick={onDelClick} className='btn btn-danger mr-3'>
        Delete
      </button>
    );
  };
  const onLikeClick = () => {
    if (!isAuthenticated) {
      showAlert('First login to like!')
      return setTimeout(() => {
        hideAlert()
      },2000)
    };
    if (role === 'comment') return likeComment(postId, commentId);
    likePost(postId);
  };
  const onDisikeClick = () => {
    if (!isAuthenticated) {
      showAlert('First login to dislike!')
      return setTimeout(() => {
        hideAlert()
      },2000)
    };
    if (role === 'comment') return dislikeComment(postId, commentId);
    dislikePost(postId);
  };

  return (
    <div className='post-container'>
      <div className='post-first-container d-flex'>
        <div className='post-likes d-flex'>
          <button onClick={onLikeClick}>
            <i
              className={`${
                status === 'likedButton' ? status : null
              } fas fa-caret-up `}
            ></i>
          </button>
          <p>{ratio}</p>
          <button onClick={onDisikeClick}>
            <i
              className={`${
                status === 'dislikedButton' ? status : null
              } fas fa-caret-down `}
            ></i>
          </button>
        </div>
        <div className='ml-5'>
          <Link
            onClick={() => postLoading()}
            to={`/posts/${postId}`}
            href='#'
            className='post-link link'
          >
            {subject}
          </Link>
          <p className='mt-2'>{text}</p>
        </div>
      </div>
      <div className='mt-2 post-options d-flex'>
        {delButton()}
        <p>
          by:{' '}
          <Link
            onClick={() => loadingProfileTrue()}
            to={`/profile/${profileIdProp}`}
            className='link'
          >
            {firstName} {lastName}
          </Link>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};
const mapDispatchToProps = {
  loadingProfileTrue,
  postLoading,
  likePost,
  dislikePost,
  deletePost,
  likeComment,
  dislikeComment,
  deleteComment,
  showAlert,
  hideAlert
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
