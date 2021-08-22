import React, { Component } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BookDetails from './containers/BookDetails/BookDetails';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/user';
import Logout from './containers/Logout/Logout';

class App extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.restoreSession();
    }
  }

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
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreSession: () => dispatch(actionCreators.restoreSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
