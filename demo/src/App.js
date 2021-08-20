import React, { Component } from 'react';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BookDetails from './containers/BookDetails/BookDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route path="/book/:id/author/:author">
              <BookDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
