import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import MyBookcase from './components/MyBookcase/MyBookcase';
import MyProfile from './components/MyProfile/MyProfile';

import Home from './containers/Home/Home';
import BookDetails from './containers/BookDetails/BookDetails';

import * as actionCreators from './store/actions/index';
import AsyncErrorHandler from './hoc/AsyncErrorHandler';

class App extends Component {
  async componentDidMount() {
    this.restoreSession();
  }

  restoreSession = async () => {
    if (!this.props.isAuthenticated && document.cookie.indexOf('session') >= 0) {
      await this.props.restoreSession();
    }
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/book/:id/author/:author">
          <BookDetails />
        </Route>
        <Route path="/login">
          <Login onLogin={this.props.onLogin} isAuthenticated={this.props.isAuthenticated} />
        </Route>
        {this.props.isAuthenticated && (
          <Route path="/logout">
            <Logout onLogout={this.props.onLogout} />
          </Route>
        )}
        <Route path="/myProfile">
          <MyProfile
            userData={this.props.userData}
            error={this.props.errors.asyncError}
            onUpdateData={this.props.updateUserData}
            onUpdatePassword={this.props.updateUserPassword}
          />
        </Route>
        <Route path="/myBookcase">
          <MyBookcase booksLists={this.props.booksLists} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Router>
        <div className="app">
          <AsyncErrorHandler asyncError={this.props.errors.asyncError}>
            <Header isAuthenticated={this.props.isAuthenticated} />
            {routes}
            <Footer />
          </AsyncErrorHandler>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    booksLists: {
      wantReadBooks: state.user.data.wantReadBooks,
      currentlyReadingBooks: state.user.data.currentlyReadingBooks,
      haveReadBooks: state.user.data.haveReadBooks,
      likedBooks: state.user.data.likedBooks,
    },
    userData: {
      photo: state.user.data.photo,
      name: state.user.data.name,
      email: state.user.data.email,
      loading: state.user.loading,
    },
    errors: {
      asyncError: state.error.asyncError,
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: () => dispatch(actionCreators.restoreSession()),
    onLogin: (email, password) => dispatch(actionCreators.login(email, password)),
    onLogout: () => dispatch(actionCreators.logout()),
    updateUserData: (name, email) => dispatch(actionCreators.updateUserData(name, email)),
    updateUserPassword: passwords => dispatch(actionCreators.updateUserPassword(passwords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
