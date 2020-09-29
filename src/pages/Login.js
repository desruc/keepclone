import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthForm from '../components/AuthForm';

import { login } from '../redux/actions';

const Login = () => {
  // Hooks
  const dispatch = useDispatch();

  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const onSubmit = () => {
    dispatch(login(email, password));
  };

  return (
    <AuthForm
      email={email}
      password={password}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  );
};

export default Login;
