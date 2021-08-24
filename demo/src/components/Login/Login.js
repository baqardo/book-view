import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../../store/actions/index';

const Login = props => {
  const handleSubmit = event => {
    event.preventDefault();

    const email = document.querySelector('#input__email').value;
    const password = document.querySelector('#input__password').value;
    props.onLogin(email, password);
  };

  return (
    <>
      {props.isAuthenticated && <Redirect to="/" />}
      <form className="login__form" onSubmit={handleSubmit}>
        <input className="login__input" id="input__email" type="text" defaultValue="jack@example.io" name="email" />
        <input className="login__input" id="input__password" type="password" defaultValue="test1234" name="password" />
        <button>Login</button>
      </form>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actionCreators.login(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
