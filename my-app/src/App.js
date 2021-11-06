import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, withRouter } from 'react-router-dom';
import UsersContainer from './Components/Users/UsersContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import Login from './Components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/appReducer'
import Loader from './Components/command/Preloader/Loader';
import { Provider } from 'react-redux';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Loader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={() => <DialogsContainer/>} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
          <Route path='/login' component={Login} />
          <Route path='/users' render={() => <UsersContainer />} />
        </div>
      </div>
    );
  }
};

let mapStateToProps = (state) => ({
  initialized: state.app.initialized
});

let AppContainer = compose(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);

const SocialNetworkApp = (props) => {
  return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
};

export default SocialNetworkApp;
