import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { createPost } from '../redux/actions/postsActions';

export const CreatePost = ({ createPost, profile: { isAuthenticated } }) => {
  const [createPostForm, setCreatePostForm] = useState({
    subject: '',
    text: '',
  });
  const onInputChange = (e) => {
    setCreatePostForm({ ...createPostForm, [e.target.name]: e.target.value });
  };
  const history = useHistory();
  const onFormSubmit = (e) => {
    e.preventDefault()
    createPost(createPostForm);
    history.push('/posts')
  };
  return (
    <div className='create-post container'>
      <form onSubmit={onFormSubmit}>
        <label className='margin-60'>Subject</label>
        <input
          className='mt-2'
          value={createPostForm.subject}
          onChange={onInputChange}
          name='subject'
          autoComplete='off'
          required
        />
        <label className='mt-4'>Text</label>
        <textarea
          rows='9'
          className='mt-2 text-input-create-post'
          value={createPostForm.text}
          onChange={onInputChange}
          name='text'
          required
        />
        <button className='btn btn-danger mt-3'>Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
