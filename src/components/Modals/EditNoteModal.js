import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash.isequal';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import NoteLabels from '../NoteLabels';
import ChangeBackgroundButton from '../NoteToolbar/ChangeBackgroundButton';
import UpdateLabelsButton from '../NoteToolbar/UpdateLabelsButton';

import ModalBase from './ModalBase';

import { attemptUpdateNote } from '../../redux/actions';
import {
  selectSelectedNote,
  selectEditModalOpen,
  selectUser
} from '../../redux/reducer';
import { EDIT_NOTE_MODAL_OPEN_STATE } from '../../redux/types';

import { backgroundColorStyles } from '../../constants/backgroundColors';

const defaultNote = {
  id: '123',
  index: 0,
  title: '',
  text: '',
  labels: [],
  backgroundColor: 'default',
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
    fontSize: '1.375rem'
  },
  text: {
    marginBottom: theme.spacing(2)
  },
  button: {
    textTransform: 'none',
    fontWeight: 500
  },
  toolbar: {
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

const EditNoteModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClose = () =>
    dispatch({ type: EDIT_NOTE_MODAL_OPEN_STATE, state: false });

  const authUser = useSelector((state) => selectUser(state));
  const open = useSelector((state) => selectEditModalOpen(state));
  const selectedNote =
    useSelector((state) => selectSelectedNote(state)) || defaultNote;

  const [note, setNote] = useState(selectedNote);

  useEffect(() => {
    if (!isEqual(note, selectedNote)) {
      setNote(selectedNote);
    }
  }, [selectedNote]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const removeLabel = (labelToRemove) => {
    setNote({
      ...note,
      labels: note.labels.filter((l) => l !== labelToRemove)
    });
  };

  const onBackgroundChange = (color) =>
    setNote({
      ...note,
      backgroundColor: color
    });

  const onLabelChange = (selectedLabel) => {
    const exists = note.labels.some((l) => l === selectedLabel);
    setNote({
      ...note,
      labels: exists
        ? note.labels.filter((l) => l !== selectedLabel)
        : [...note.labels, selectedLabel]
    });
  };

  const onSave = () => {
    const hasChanged = !isEqual(note, selectedNote);
    if (hasChanged) dispatch(attemptUpdateNote(authUser, note));
    handleClose();
  };

  const { title, text, labels, backgroundColor } = note;

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
      <InputBase
        fullWidth
        name="title"
        placeholder="Title"
        value={title}
        onChange={onInputChange}
        className={classes.title}
      />
      <InputBase
        fullWidth
        name="text"
        value={text}
        onChange={onInputChange}
        multiline
        className={classes.text}
      />
      <NoteLabels labels={labels} onRemove={removeLabel} />
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.toolbar}>
        <UpdateLabelsButton noteLabels={labels} onChange={onLabelChange} />
        <ChangeBackgroundButton
          onChange={onBackgroundChange}
          currentColor={backgroundColor}
        />
        <Button onClick={onSave} className={classes.button}>
          Save
        </Button>
      </Box>
    </ModalBase>
  );
};

export default EditNoteModal;
