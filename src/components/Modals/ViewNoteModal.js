import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ModalBase from './ModalBase';
import LabelsAndTimestamp from '../LabelsAndTimestamp';
import {
  RestoreItem,
  PermanentlyDeleteItem
} from '../NoteToolbar/NoteToolbarButtons';

import {
  attemptRestoreNote,
  attemptPermenatlyDeleteNote
} from '../../redux/actions';
import { selectUser } from '../../redux/reducer';
import { SET_TOAST_PROPS } from '../../redux/types';

import { backgroundColorStyles } from '../../constants/backgroundColors';

const defaultNote = {
  id: '123',
  index: 0,
  title: '',
  text: '',
  labels: [],
  backgroundColor: 'transparent',
  archived: false,
  trashed: false
};

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 46,
    width: 600,
    margin: '0px auto 16px auto',
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    })
  },
  title: {
    marginBottom: theme.spacing(1),
    fontSize: '1.375rem',
    fontWeight: 500
  },
  text: {
    fontSize: '0.825rem',
    marginBottom: theme.spacing(2)
  },
  button: {
    textTransform: 'none',
    fontWeight: 500
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& .MuiIconButton-root': {
      marginRight: theme.spacing(1)
    },
    '& .MuiSvgIcon-root': {
      height: 18,
      width: 18
    }
  },
  ...backgroundColorStyles(theme)
}));

const ViewNoteModal = ({ open, handleClose, note }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => selectUser(state));

  const onRestoreNote = (e) => {
    e.stopPropagation();
    handleClose();
    dispatch(attemptRestoreNote(authUser, note));
  };

  const onPermanetlyDeleteNote = () => {
    handleClose();
    dispatch(attemptPermenatlyDeleteNote(authUser, note));
  };

  const openToast = () => {
    dispatch({
      type: SET_TOAST_PROPS,
      open: true,
      message: 'Cannot edit notes in the trash'
    });
  };

  const { title, text, backgroundColor } = note || defaultNote;

  const paperClass = clsx({
    [classes.paper]: true,
    [classes[backgroundColor]]: true
  });

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      paperClassName={paperClass}
    >
      <div onClick={openToast} role="presentation">
        {title && <Typography className={classes.title}>{title}</Typography>}
        <Typography className={classes.text}>{text}</Typography>
        <LabelsAndTimestamp note={note} />
        <div className={classes.toolbar}>
          <RestoreItem onClick={onRestoreNote} />
          <PermanentlyDeleteItem onClick={onPermanetlyDeleteNote} />
        </div>
      </div>
    </ModalBase>
  );
};

ViewNoteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  note: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    backgroundColor: PropTypes.string,
    archived: PropTypes.bool,
    trashed: PropTypes.bool
  })
};

ViewNoteModal.defaultProps = {
  note: {
    id: '123',
    index: 0,
    title: '',
    text: '',
    labels: [],
    backgroundColor: 'transparent',
    archived: false,
    trashed: false
  }
};

export default ViewNoteModal;
