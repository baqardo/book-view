import React from 'react';
import { Redirect } from 'react-router-dom';

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

export default Login;
