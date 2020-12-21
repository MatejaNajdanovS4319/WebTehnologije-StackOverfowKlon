import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../redux/actions/profileActions';

const SignUp = ({ profile: { isAuthenticated }, signUp }) => {
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    job: '',
  });

  const onInputChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    signUp(registerForm);
  };
  if (isAuthenticated) return <Redirect to='/posts' />;
  return (
    <div className='container login-container register-container'>
      <h2 className='login-header'>Register new account</h2>
      <form onSubmit={onFormSubmit} className="mt-5">
        <div className='d-flex login-form-inputs'>
          <label>First name: </label>
          <input
            className='ml-3'
            onChange={onInputChange}
            name='firstName'
            type='text'
            value={registerForm.firstName}
            required
            autoComplete='off'
          />
        </div>
        <div className='d-flex login-form-inputs'>
          <label>Last name: </label>
          <input
            className='ml-3'
            onChange={onInputChange}
            name='lastName'
            type='text'
            value={registerForm.lastName}
            required
          />
        </div>
        <div className='d-flex login-form-inputs'>
          <label>Email: </label>
          <input
            className='ml-3'
            onChange={onInputChange}
            name='email'
            type='email'
            value={registerForm.email}
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
            pattern='.{6,20}'
            value={registerForm.password}
            required
          />
        </div>
        <div className='d-flex login-form-inputs'>
          <label>Job: </label>
          <input
            className='ml-3'
            onChange={onInputChange}
            name='job'
            type='text'
            value={registerForm.job}
            required
          />
        </div>
        <button className='btn btn-danger' type='submit'>
          Sign up
        </button>
      </form>
      <p className='sm-text-gray'>
        Have an account?{' '}
        <Link to='/login' className='link'>
          Log in
        </Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
const mapDispatchToProps = {
  signUp,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
