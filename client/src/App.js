import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './style/index.css';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import IndexPage from './components/IndexPage';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Posts from './components/Posts';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import Messages from './components/Messages';
import PostComment from './components/PostComment';
import NotFound from './components/NotFound';
import { checkProfile } from './redux/actions/profileActions';
import Alert from './components/layout/Alert';

const App = () => {
  useEffect(() => {
    store.dispatch(checkProfile(localStorage.getItem('token')));
  }, []);
  return (
    <Provider store={store}>
      <div className='app-body'>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <Switch>
            <Route path='/' exact component={IndexPage} />
            <Route path='/posts' exact component={Posts} />
            <Route path='/login' exact component={LogIn} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/profile/:id' exact component={Profile} />
            <Route path='/posts/:id' exact component={PostComment} />
            <PrivateRoute path='/createPost' exact component={CreatePost} />
            <PrivateRoute path="/messages" exact component={Messages} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
