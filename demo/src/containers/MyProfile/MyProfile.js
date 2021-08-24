import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();

    this.currentPasswordRef = React.createRef();
    this.newPasswordRef = React.createRef();
    this.confirmPasswordRef = React.createRef();
  }

  componentDidUpdate() {
    if (!this.props.loading && !this.props.error) {
      this.currentPasswordRef.current.value = '';
      this.newPasswordRef.current.value = '';
      this.confirmPasswordRef.current.value = '';
    }
  }

  handleDataChanges = () => {
    const name = this.nameRef.current.value;
    const email = this.emailRef.current.value;

    this.props.updateUserData(name, email);
  };

  handlePasswordChange = () => {
    const passwordCurrent = this.currentPasswordRef.current.value;
    const password = this.newPasswordRef.current.value;
    const passwordConfirm = this.confirmPasswordRef.current.value;

    const passwords = {
      passwordCurrent,
      password,
      passwordConfirm,
    };

    this.props.updateUserPassword(passwords);
  };

  render() {
    return (
      <div className="my-profile">
        Name: <input type="text" defaultValue={this.props.name} id="input__name" name="name" ref={this.nameRef} />
        <br />
        Email: <input type="email" defaultValue={this.props.email} id="input__email" name="email" ref={this.emailRef} />
        <br />
        Photo: {this.props.photo}
        <br />
        <button onClick={this.handleDataChanges}>Save Changes</button>
        <br />
        <br />
        Current password:{' '}
        <input type="password" id="input__current-password" name="current-password" ref={this.currentPasswordRef} />
        <br />
        New password: <input type="password" id="input__new-password" name="new-password" ref={this.newPasswordRef} />
        <br />
        Confirm password:{' '}
        <input type="password" id="input__confirm-password" name="confirm-password" ref={this.confirmPasswordRef} />
        <br />
        <button onClick={this.handlePasswordChange}>Save Changes</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.user.data.photo,
    name: state.user.data.name,
    email: state.user.data.email,
    loading: state.user.data.loading,
    error: state.user.data.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: (name, email) => dispatch(actionCreators.updateUserData(name, email)),
    updateUserPassword: passwords => dispatch(actionCreators.updateUserPassword(passwords)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
