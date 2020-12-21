import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logOut, loadingProfileTrue } from '../../redux/actions/profileActions';

const Navbar = ({
  logOut,
  profile: {
    isAuthenticated,
    profile: { firstName, _id },
    profileToView,
  },
  loadingProfileTrue,
}) => {
  const history = useHistory();
  const onLogOutClick = () => {
    logOut();
    history.push('/login');
  };
  const onGetProfileClick = () => {
    if (profileToView._id !== _id) {
      loadingProfileTrue();
    }
  };

  const nav = isAuthenticated ? (
    <div className='d-flex'>
      <Link onClick={onGetProfileClick} to={`/profile/${_id}`}>
        {firstName}
      </Link>
      <Link to='/login'>Posts</Link>
      <Link to='/messages' className='p-relative messages-link'>
        Messages
      </Link>
      <button onClick={onLogOutClick}>Logout</button>
    </div>
  ) : (
    <div className='d-flex'>
      <Link to='/posts'>Posts</Link>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
    </div>
  );
  return (
    <div id='navbar'>
      <div className='container navbar-container'>
        <div className='navbar-brand'>
          <Link to='/' className='brand'>
            DevHelp
          </Link>
        </div>
        {nav}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
const mapDispatchToProps = {
  logOut,
  loadingProfileTrue,
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
