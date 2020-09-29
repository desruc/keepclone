import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

const AuthForm = ({ email, password, onChange, onSubmit }) => {
  // Hooks
  const classes = useStyles();

  return (
    <Box className={classes.wrap}>
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
      <Button color="primary" variant="contained" onClick={onSubmit}>
        Next
      </Button>
    </Box>
  );
};

AuthForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AuthForm;
