import React, { useEffect, useRef } from 'react';

const MyProfile = props => {
  const nameRef = useRef();
  const emailRef = useRef();

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    if (!props.userData.loading && !props.userData.error) {
      currentPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
      confirmPasswordRef.current.value = '';
    }
  });

  const handleDataChanges = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;

    props.onUpdateData(name, email);
  };

  const handlePasswordChange = () => {
    const passwordCurrent = currentPasswordRef.current.value;
    const password = newPasswordRef.current.value;
    const passwordConfirm = confirmPasswordRef.current.value;

    const passwords = {
      passwordCurrent,
      password,
      passwordConfirm,
    };

    props.onUpdatePassword(passwords);
  };

  return (
    <div className="my-profile">
      Name: <input type="text" defaultValue={props.userData.name} id="input__name" name="name" ref={nameRef} />
      <br />
      Email: <input type="email" defaultValue={props.userData.email} id="input__email" name="email" ref={emailRef} />
      <br />
      Photo: {props.userData.photo}
      <br />
      <button onClick={handleDataChanges}>Save Changes</button>
      <br />
      <br />
      Current password:{' '}
      <input type="password" id="input__current-password" name="current-password" ref={currentPasswordRef} />
      <br />
      New password: <input type="password" id="input__new-password" name="new-password" ref={newPasswordRef} />
      <br />
      Confirm password:{' '}
      <input type="password" id="input__confirm-password" name="confirm-password" ref={confirmPasswordRef} />
      <br />
      <button onClick={handlePasswordChange}>Save Changes</button>
    </div>
  );
};

export default MyProfile;
