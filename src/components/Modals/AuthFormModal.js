import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import ModalBase from './ModalBase';

import { loginWithEmail, loginWithGoogle } from '../../firebase/fbAuth';

const useStyles = makeStyles((theme) => ({
  wrap: {
    minHeight: 500,
    padding: '48px 40px 36px',
    border: '1px solid #dadce0',
    borderRadius: 8,
    width: 450,
    '& .MuiTextField-root, .MuiButtonBase-root': {
      display: 'block',
      marginTop: theme.spacing(4)
    }
  },
  heading: {
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '1.3333'
  }
}));

const AuthFormModal = ({ open, handleClose }) => {
  // Hooks
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else setPassword(value);
  };

  const handleLogin = () => {
    loginWithEmail(email, password)
      .then(() => handleClose())
      .catch((error) => {
        // TODO: Display error
        console.log('handleLogin -> error', error);
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => handleClose())
      .catch((error) => {
        // TODO: Display error
        console.log('handleGoogleLogin -> error', error);
      });
  };

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      paperClassName={classes.wrap}
    >
      <Typography component="h1" className={classes.heading} align="center">
        Sign in
      </Typography>
      <TextField
        id="email-field"
        name="email"
        label="Email"
        value={email}
        onChange={onChange}
        variant="outlined"
        fullWidth
      />
      <TextField
        id="password-field"
        name="password"
        label="Password"
        value={password}
        onChange={onChange}
        variant="outlined"
        fullWidth
      />
      <Box display="flex" justifyContent="center">
        <Button color="primary" variant="contained" onClick={handleLogin}>
          Log in
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button color="primary" variant="contained" onClick={handleGoogleLogin}>
          Login with Google
        </Button>
      </Box>
    </ModalBase>
  );
};

AuthFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default AuthFormModal;
