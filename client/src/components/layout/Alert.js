import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alert: { msg, isDisplayed } }) => {
  return isDisplayed ? (
    <div className='alert-container container'>
      <h2>{msg}</h2>
    </div>
  ) : null;
};
const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};
export default connect(mapStateToProps, null)(Alert);
