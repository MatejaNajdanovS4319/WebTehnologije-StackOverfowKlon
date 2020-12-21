import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logIn } from '../redux/actions/profileActions';

const LogIn = ({ profile: { isAuthenticated }, logIn }) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const onInputChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    logIn(loginForm);
  };
  if (isAuthenticated) return <Redirect to='/posts' />;
  return (
    <div className='container login-container'>
      <h2 className='login-header'>Login to your account</h2>
      <form onSubmit={onFormSubmit} className="mt-5">
        <div className='d-flex login-form-inputs'>
          <label>Email: </label>
          <input
            className='ml-3'
            onChange={onInputChange}
            name='email'
            type='email'
            value={loginForm.email}
            required
            autoComplete='off'
          />
        </div>
        <div className='d-flex login-form-inputs'>
          <label>Password: </label>
          <input
            className='ml-3'
            onChange={onInputChange}
            name='password'
            type='password'
            value={loginForm.password}
            pattern='.{6,20}'
            required
          />
        </div>
        <button className='btn btn-danger' type='submit'>
          Log in
        </button>
      </form>
      <p className='sm-text-gray'>
        Don't have an account?{' '}
        <Link to='/signup' className='link'>
          Sign up
        </Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  logIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
