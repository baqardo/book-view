import React, { Component } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BookDetails from './containers/BookDetails/BookDetails';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import Logout from './containers/Logout/Logout';
import MyProfile from './containers/MyProfile/MyProfile';
import MyBookcase from './containers/MyBookcase/MyBookcase';

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
          <Login />
        </Route>
        {this.props.isAuthenticated && (
          <Route path="/logout">
            <Logout />
          </Route>
        )}
        <Route path="/myProfile">
          <MyProfile />
        </Route>
        <Route path="/myBookcase">
          <MyBookcase />
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
          <Header />
          {routes}
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: () => dispatch(actionCreators.restoreSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
