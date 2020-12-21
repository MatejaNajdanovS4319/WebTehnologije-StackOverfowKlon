import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Message from './layout/Message';
import {
  getMessages,
  getSentMessages,
  loadingProfileTrue,
} from '../redux/actions/profileActions';
import Loader from './layout/Loader';

export const Messages = ({
  getMessages,
  getSentMessages,
  loadingProfileTrue,
  profile: { loading, profile },
}) => {
  const [screen, setScreen] = useState('inbox');
  useEffect(() => {
    loadingProfileTrue();
    getMessages();
    getSentMessages();
  }, [loadingProfileTrue, getMessages, getSentMessages]);

  const messages = () => {
    if (profile.messages.allIds) {
      return profile.messages.allIds.map((id) => {
        const mapedMessage = profile.messages.byIds[id];
        return (
          <div key={id}>
            <Message
              id={id}
              email={mapedMessage.email}
              text={mapedMessage.text}
              isViewed={mapedMessage.isViewed}
            />
          </div>
        );
      });
    }
    return null;
  };

  const sentMessages = () => {
    if (profile.sentMessages.allIds) {
      return profile.sentMessages.allIds.map((id) => {
        const mapedMessage = profile.sentMessages.byIds[id];
        return (
          <div key={id}>
            <Message
              email={mapedMessage.email}
              text={mapedMessage.text}
              isViewed={true}
            />
          </div>
        );
      });
    }
    return null;
  };

  const onSentMessageClick = () => {
    setScreen('sentMessages');
  };
  const onInboxClick = () => {
    setScreen('inbox');
  };

  if (loading) return <Loader />;
  return screen === 'inbox' ? (
    <div className='container'>
      <div className='messages-buttons d-flex mt-4'>
        <button className="btn-danger btn mr-4" onClick={onInboxClick}>Inbox</button>
        <button className="btn" onClick={onSentMessageClick}>Sent</button>
      </div>
      {messages()}
    </div>
  ) : (
    <div className='container'>
      <div className='messages-buttons mt-4'>
        <button className="btn" onClick={onInboxClick}>Inbox</button>
        <button className="btn-danger btn ml-4" onClick={onSentMessageClick}>Sent</button>
      </div>
      {sentMessages()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = {
  getMessages,
  getSentMessages,
  loadingProfileTrue,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
