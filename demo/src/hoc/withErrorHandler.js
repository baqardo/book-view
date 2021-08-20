import React, { Component } from 'react';

const withErrorHandler = WrappedComponent => {
  return class extends Component {
    state = {
      error: null,
      development: true,
    };

    handleError = error => {
      this.setState({ error });
    };

    render() {
      if (!this.state.error) return <WrappedComponent {...this.props} handleError={this.handleError} />;

      if (this.state.development) console.log(this.state.error.stack);
      return this.state.error.isOperational ? <h1>{this.state.error.message}</h1> : <h1>Something went wrong</h1>;
    }
  };
};

export default withErrorHandler;
