import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const ToastNotification = ({ open, handleClose, message, action }) => {
  const classes = useStyles();

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};

ToastNotification.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.node
};

ToastNotification.defaultProps = {
  action: null
};

export default ToastNotification;
