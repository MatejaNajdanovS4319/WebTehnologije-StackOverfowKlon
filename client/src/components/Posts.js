import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { get15Posts, searchPosts } from '../redux/actions/postsActions';
import Post from './layout/Post';
import Loader from './layout/Loader';

const Posts = ({
  searchPosts,
  get15Posts,
  posts,
  profile: {
    profile: { _id },
    isAuthenticated,
  },
}) => {
  useEffect(() => {
    if (posts.posts.allIds.length === 0) get15Posts();
  }, [get15Posts]);
  const [numPage, setNumPage] = useState(1);
  const [postsForm, setPostsFrom] = useState({
    search: '',
  });

  const onInputChange = (e) => {
    setPostsFrom({ ...postsForm, [e.target.name]: e.target.value });
  };
  const onGetPostsClick = async () => {
    const offset = window.pageYOffset;
    setNumPage(numPage + 1);
    await get15Posts(numPage);
    window.scrollTo(0, offset);
  };
  const onSearchSubmit = (e) => {
    e.preventDefault();
    searchPosts(postsForm.search);
  };

  if (posts.posts.allIds) {
    var postsAll = posts.posts.allIds.map((id) => {
      let status = null;
      const mapedPost = posts.posts.byIds[id];
      if (mapedPost.likes.filter((like) => like.profile === _id).length > 0) {
        status = 'likedButton';
      }
      if (
        mapedPost.dislikes.filter((dislike) => dislike.profile === _id).length >
        0
      ) {
        status = 'dislikedButton';
      }
      return (
        <div key={id}>
          <Post
            postId={id}
            profileIdProp={mapedPost.profile}
            firstName={mapedPost.firstName}
            lastName={mapedPost.lastName}
            subject={mapedPost.subject}
            text={mapedPost.text}
            ratio={mapedPost.likes.length - mapedPost.dislikes.length}
            status={status}
          />
        </div>
      );
    });
  }
  const makeAPost = () => {
    return isAuthenticated ? (
      <div className='gray-text mt-5 ml-2'>
        Want to create a post? Press here{' '}
        <Link
          to='/createPost'
          className='btn btn-danger create-post-button ml-2'
        >
          Create a post
        </Link>
      </div>
    ) : (
      <div className='gray-text mt-5 ml-2'>
        Login if you want to create a post{' '}
        <Link to='/login' className='btn btn-danger create-post-button ml-2'>
          Login
        </Link>
      </div>
    );
  };
  return !posts.loading ? (
    <div className='container'>
      <div className='posts-container'>
        <div className='posts-form mt-5'>
          <form className='d-flex' onSubmit={onSearchSubmit}>
            <input
              autoComplete='off'
              placeholder='Search'
              type='text'
              onChange={onInputChange}
              value={postsForm.search}
              name='search'
              className='mr-4'
            />
            <button className='btn btn-danger' type='submit'>
              Search
            </button>
          </form>
        </div>
        {makeAPost()}
        <div className='posts mt-5'></div>
      </div>
      {postsAll}
      <button
        onClick={onGetPostsClick}
        className='btn btn-danger m-auto d-block mb-4'
      >
        <i className='fas fa-plus'></i>
      </button>
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
  get15Posts,
  searchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
