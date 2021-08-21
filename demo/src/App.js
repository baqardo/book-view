import React, { Component } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import BookDetails from './containers/BookDetails/BookDetails';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/book/:id/author/:author">
          <BookDetails />
        </Route>
        <Route path="/login">
          <Login />
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

export default App;
