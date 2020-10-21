import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ModalBase from './ModalBase';
import NoteLabels from '../NoteLabels';

import {
  backgroundColorStyles,
  backgroundColors
} from '../../constants/backgroundColors';

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
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    })
  },
  title: {
    marginBottom: theme.spacing(1),
    fontSize: '1.375rem'
  },
  button: {
    textTransform: 'none',
    fontWeight: 500
  },
  toolbar: {
    '& .MuiIconButton-root': {
      marginRight: theme.spacing(1)
    }
  },
  ...backgroundColorStyles()
}));

const ViewNoteModal = ({ open, handleClose, note }) => {
  const classes = useStyles();

  const { title, text, labels, backgroundColor } = note || defaultNote;

  const { key: bgKey } = backgroundColors.find(
    (c) => c.color === backgroundColor
  );

  const paperClass = clsx({
    [classes.paper]: true,
    [classes[bgKey]]: true
  });

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      paperClassName={paperClass}
    >
      {title && <Typography className={classes.title}>{title}</Typography>}
      <Typography>{text}</Typography>
      <NoteLabels labels={labels} />
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
