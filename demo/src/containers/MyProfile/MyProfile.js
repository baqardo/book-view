import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyProfile extends Component {
  render() {
    return (
      <div className="my-profile">
        Name: {this.props.name}
        <br />
        Email: {this.props.email}
        <br />
        Photo: {this.props.photo}
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

export default connect(mapStateToProps)(MyProfile);
