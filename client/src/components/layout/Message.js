import React from 'react';
import MessageModal from './MessageModal';
import { connect } from 'react-redux';
import { messsageModalShow } from '../../redux/actions/modalsActions';
import { viewMessage } from '../../redux/actions/profileActions';

const Message = ({ id, email, text, isViewed, modal, messsageModalShow, viewMessage}) => {
  let textSmall = text;
  if (text.length > 50) {
    textSmall = text.slice(0, 50);
    textSmall = textSmall.concat('...');
  }
  const onDivClick = () => {
    if(!isViewed)
    viewMessage(id);
    messsageModalShow(email, text);
  };
  return (
    <div>
      <MessageModal
        isShown={modal.isShown}
        email={modal.from}
        text={modal.text}
      />
      <div
        onClick={onDivClick}
        className={`${
          !isViewed ? 'message-viewed' : ''
        } message-container d-flex mt-3`}
      >
        <p className='message-email'>{email}</p>
        <p className='message-text'>{textSmall}</p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  modal: state.modal,
});

const mapDispatchToProps = {
  messsageModalShow,
  viewMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Message);
