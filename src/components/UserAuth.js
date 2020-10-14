import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AuthFormModal from './Modals/AuthFormModal';
import ConfirmationModal from './Modals/ConfirmationModal';

import { selectUser } from '../redux/reducer';

import { logout } from '../firebase/fbAuth';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1)
  }
}));

const UserAuth = () => {
  const classes = useStyles();

  const [loginOpen, setLoginOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const openLoginModal = () => setLoginOpen(true);
  const closeLoginModal = () => setLoginOpen(false);

  const openLogoutModal = () => setLogoutOpen(true);
  const closeLogoutModal = () => setLogoutOpen(false);

  const handleLogout = async () => {
    await logout();
    closeLogoutModal();
  };

  // Redux
  const authUser = useSelector((state) => selectUser(state));

  const loggedIn = Boolean(authUser);

  const computedIconOnClick = loggedIn ? openLogoutModal : openLoginModal;

  return (
    <>
      <IconButton
        color="inherit"
        aria-label={loggedIn ? 'Log out' : 'Log in'}
        title={loggedIn ? 'Log out' : 'Log in'}
        onClick={computedIconOnClick}
        className={classes.icon}
      >
        {loggedIn ? <ExitToAppIcon /> : <PersonIcon />}
      </IconButton>
      <AuthFormModal open={loginOpen} handleClose={closeLoginModal} />
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
