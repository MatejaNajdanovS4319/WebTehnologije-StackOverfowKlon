import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getComments, postLoading, commentPost } from '../redux/actions/postsActions';
import Loader from './layout/Loader';
import Post from './layout/Post';

export const PostComment = ({
  getComments,
  postLoading,
  commentPost,
  posts: {
    loading,
    comments: { post, byIds, allIds },
  },
  profile: {
    profile: { _id },
  },
}) => {
  const { id } = useParams();
  useEffect(() => {
    getComments(id);
  }, [getComments, postLoading]);
  const [answer, setAnswer] = useState('');

  const onInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const onFormSubmit = (e) => {
    commentPost(post._id,answer)
  }

  const postStatus = () => {
    let status = null;
    if (!loading) {
      if (post.likes.filter((like) => like.profile === _id).length > 0) {
        status = 'likedButton';
      }
      if (
        post.dislikes.filter((dislike) => dislike.profile === _id).length > 0
      ) {
        status = 'dislikedButton';
      }
    }
    return status;
  };

  const comments = () => {
    if (!loading && allIds.length > 0) {
      return allIds.map((id) => {
        const mappedComment = byIds[id];
        const commentStatus = () => {
          let status = null;
          if (!loading) {
            if (mappedComment.likes.filter((like) => like.profile === _id).length > 0) {
              status = 'likedButton';
            }
            if (
              mappedComment.dislikes.filter((dislike) => dislike.profile === _id).length > 0
            ) {
              status = 'dislikedButton';
            }
          }
          return status;
        };
        return (
          <div key={id}>
            <Post
              postId={post._id}
              commentId={id}
              profileIdProp={mappedComment.profile}
              firstName={mappedComment.firstName}
              lastName={mappedComment.lastName}
              subject={mappedComment.subject}
              text={mappedComment.text}
              ratio={mappedComment.likes.length - mappedComment.dislikes.length}
              status={commentStatus()}
              role="comment"
            />
          </div>
        );
      });
    }
    return <div>No answers!</div>;
  };

  return !loading ? (
    <div className='container comments-container'>

      <form className='d-flex mt-4' onSubmit={onFormSubmit}>
        <input
          autoComplete='off'
          placeholder='Answer'
          type='text'
          onChange={onInputChange}
          value={answer}
          name='answer'
          className='mr-4'
        />
        <button className='btn btn-danger' type='submit'>
          Answer
        </button>
      </form>
      <div className='mt-4'>
      <h2 className="mb-3 onlylink">Question: {post.subject}</h2>
        <Post
          postId={id}
          profileIdProp={post.profile}
          firstName={post.firstName}
          lastName={post.lastName}
          text={post.text}
          ratio={post.likes.length - post.dislikes.length}
          status={postStatus()}
          role='question'
        />
      </div>
      <h2 className="mb-4">Answers:</h2>
      {comments()}
    </div>
  ) : (
    <Loader />
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  profile: state.profile,
});

const mapDispatchToProps = {
  getComments,
  postLoading,
  commentPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
