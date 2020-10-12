import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ModalBase from './ModalBase';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 430,
    borderRadius: 8,
    padding: 24
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing(2),
    '& .MuiButton-root': {
      '&:not(:last-child)': {
        marginRight: theme.spacing(2)
      }
    }
  }
}));

const ConfirmationModal = ({
  open,
  handleClose,
  prompt,
  confirmButtonLabel,
  onConfirm
}) => {
  const classes = useStyles();

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      paperClassName={classes.paper}
    >
      <Typography>{prompt}</Typography>
      <div className={classes.toolbar}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">{confirmButtonLabel}</Button>
      </div>
    </ModalBase>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  prompt: PropTypes.string,
  confirmButtonLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired
};

ConfirmationModal.defaultProps = {
  prompt: 'Are you sure?',
  confirmButtonLabel: 'Confirm'
};

export default ConfirmationModal;
