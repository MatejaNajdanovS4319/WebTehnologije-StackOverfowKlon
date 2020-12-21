import React from 'react';
import { messsageModalHide } from '../../redux/actions/modalsActions';
import { connect } from 'react-redux'

const MessageModal = ({ isShown, email, text, messsageModalHide }) => {
  return isShown ?
     (
      <div className='modal-container d-flex'>
        <div className='modal p-relative'>
          <button onClick={()=> {
            messsageModalHide()
          }} className='close-modal-button'>
            <i className='fas fa-times'></i>
          </button>
          <h3 className='mt-3'>From:</h3>
          <p>{email}</p>
          <div className='mt-4'>
            <h3>Text:</h3>
            <p>{text}</p>
          </div>
        </div>
      </div>
    ) : null
};

const mapDispatchToProps = {
  messsageModalHide,
};
export default connect(null, mapDispatchToProps)(MessageModal);
