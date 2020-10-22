import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import ConfirmationModal from './Modals/ConfirmationModal';

import { selectUser } from '../redux/reducer';

import { loginWithGoogle, logout } from '../firebase/fbAuth';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1)
  }
}));

const UserAuth = () => {
  const classes = useStyles();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const openLogoutModal = () => setLogoutOpen(true);
  const closeLogoutModal = () => setLogoutOpen(false);

  const handleLogout = async () => {
    await logout();
    closeLogoutModal();
  };

  // Redux
  const authUser = useSelector((state) => selectUser(state));

  const loggedIn = Boolean(authUser);

  const handleGoogleLogin = () => {
    loginWithGoogle().catch((error) => {
      // TODO: Display error
      console.log('handleGoogleLogin -> error', error);
    });
  };

  const computedIconOnClick = loggedIn ? openLogoutModal : handleGoogleLogin;

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={loggedIn ? 'Log out' : 'Log in with Google'}
        title={loggedIn ? 'Log out' : 'Log in with Google'}
        onClick={computedIconOnClick}
        className={classes.icon}
      >
        {loggedIn ? <ExitToAppIcon /> : <PersonIcon />}
      </IconButton>
      <ConfirmationModal
        open={logoutOpen}
        handleClose={closeLogoutModal}
        prompt="Are you sure you want to log out?"
        onConfirm={handleLogout}
      />
    </>
  );
};

export default UserAuth;
