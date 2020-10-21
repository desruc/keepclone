import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    outline: 'none'
  }
}));

const ModalBase = ({ open, handleClose, paperClassName, children }) => {
  const classes = useStyles();

  const paperClass = clsx({
    [classes.paper]: true,
    [paperClassName]: Boolean(paperClassName)
  });

  return (
    <Modal
      aria-labelledby="modal-base"
      aria-describedby="modal-base"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={paperClass}>{children}</div>
      </Fade>
    </Modal>
  );
};

ModalBase.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  paperClassName: PropTypes.string,
  children: PropTypes.node.isRequired
};

ModalBase.defaultProps = {
  paperClassName: ''
};

export default ModalBase;
