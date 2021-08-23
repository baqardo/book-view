import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/user';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.emailRef = React.createRef();
  }

  handleDataChanges = () => {
    const name = this.nameRef.current.value;
    const email = this.emailRef.current.value;

    this.props.updateUserData(name, email);
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
        Current password: <input id="input__current-password" name="current-password" />
        <br />
        New password: <input id="input__new-password" name="new-password" />
        <br />
        Confirm password: <input id="input__confirm-password" name="confirm-password" />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    photo: state.photo,
    name: state.name,
    email: state.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserData: (name, email) => dispatch(actionCreators.updateUserData(name, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
