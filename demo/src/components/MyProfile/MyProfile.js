import React, { useEffect, useRef } from 'react';

const MyProfile = ({ loading, error, userData, onUpdateData, onUpdatePassword }) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const photoRef = useRef();

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  useEffect(() => {
    if (!loading && !error) {
      currentPasswordRef.current.value = '';
      newPasswordRef.current.value = '';
      confirmPasswordRef.current.value = '';
    }
  });

  const handleDataChange = () => {
    const form = new FormData();
    form.append('name', nameRef.current.value);
    form.append('email', emailRef.current.value);
    form.append('photo', photoRef.current.files[0]);

    onUpdateData(form);
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

    onUpdatePassword(passwords);
  };

  const { name, email, photo } = userData;
  return (
    <div className="my-profile">
      Name: <input type="text" defaultValue={name} id="input__name" name="name" ref={nameRef} />
      <br />
      Email: <input type="email" defaultValue={email} id="input__email" name="email" ref={emailRef} />
      <br />
      Photo: <input type="file" accept="image/*" id="input__photo" name="photo" ref={photoRef} />
      {photo}
      <br />
      <button onClick={handleDataChange}>Save Changes</button>
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
