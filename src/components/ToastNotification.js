import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import { attemptUnarchiveNote, attemptRestoreNote } from '../redux/actions';
import {
  selectUser,
  selectToastProps,
  selectSelectedNote
} from '../redux/reducer';
import {
  UNARCHIVE_LOCAL_NOTE,
  RESTORE_LOCAL_NOTE,
  CLOSE_TOAST
} from '../redux/types';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const ToastNotification = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => selectUser(state));
  const note = useSelector((state) => selectSelectedNote(state));
  const toastProps = useSelector((state) => selectToastProps(state));

  const unarchive = () => dispatch(attemptUnarchiveNote(authUser, note));

  const restore = () => dispatch(attemptRestoreNote(authUser, note));

  const handleClose = () =>
    dispatch({
      type: CLOSE_TOAST
    });

  const { open, message, actionType } = toastProps;

  const getAction = () => {
    switch (actionType) {
      case UNARCHIVE_LOCAL_NOTE:
        return (
          <Button onClick={unarchive} color="primary">
            Undo
          </Button>
        );

      case RESTORE_LOCAL_NOTE:
        return (
          <Button onClick={restore} color="primary">
            Undo
          </Button>
        );

      default:
        return null;
    }
  };

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
      action={getAction()}
    />
  );
};

export default ToastNotification;
