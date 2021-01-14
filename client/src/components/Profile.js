import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile, sendMessage } from '../redux/actions/profileActions';
import { hideAlert, showAlert } from '../redux/actions/alertActions'
import Loader from './layout/Loader';
import image from '../style/img/placeholder-img.png';

export const Profile = ({
  sendMessage,
  getProfile,
  profile: { profileToView, isAuthenticated, loading },
  
  showAlert,
  hideAlert
}) => {
  const { id } = useParams();
  useEffect(() => {
    getProfile(id);
  }, [getProfile, id]);
  const [messageText, setMessageText] = useState({
    text: '',
  });
  const { firstName, lastName, job, email } = profileToView;

  const onInputChange = (e) => {
    setMessageText({ ...messageText, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if(!isAuthenticated) {
      showAlert('Please sign in first!')
      return setTimeout(()=>{hideAlert()},2000 )
      
    }
    sendMessage(id, messageText.text);
    setMessageText({ text: '' });
  };

  return !loading ? (
    <div className='container profile-container'>
      <form onSubmit={onFormSubmit}>
        <div className='d-flex profile-main'>
          <div className='profile-image'>
            <img src={image} alt='profile' />
          </div>
          <div className='about-profile'>
            <h2>{`${firstName} ${lastName}`}</h2>
            <h2>{`${job}`}</h2>
            <h2>{`${email}`}</h2>
          </div>
          <div>
            <textarea
              rows='6'
              required
              onChange={onInputChange}
              value={messageText.text}
              name='text'
            />
            <button className='btn btn-danger'>Contact {firstName}</button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Loader />
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getProfile,
  sendMessage,
  showAlert,
  hideAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
