import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import NoteLabels from './NoteLabels';

import { attemptAddNote } from '../redux/actions';
import { selectActiveNotes, selectUser } from '../redux/reducer';

import { useOnClickOutside } from '../utils/hooks';

import { randomId } from '../utils/helpers';

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: 46,
    width: 600,
    margin: '0px auto 16px auto',
    padding: theme.spacing(1)
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  button: {
    textTransform: 'none',
    fontWeight: 500
  }
}));

const NoteInput = ({ label }) => {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  // Redux
  const authUser = useSelector((state) => selectUser(state));
  const notes = useSelector((state) => selectActiveNotes(state));

  // Helpers
  const getEmptyTextNote = (index) => ({
    id: randomId(),
    index,
    title: '',
    text: '',
    labels: label ? [label] : [],
    backgroundColor: 'transparent',
    archived: false,
    trashed: false
  });

  // Local state
  const [focused, setFocused] = useState(false);
  const [note, setNote] = useState(getEmptyTextNote(notes.length));

  // Event handlers
  const onFocus = () => setFocused(true);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value
    });
  };

  const resetNote = () => {
    setNote({
      ...note,
      text: ''
    });
  };

  const saveNote = () => {
    dispatch(attemptAddNote(authUser, note));
    setNote(getEmptyTextNote(notes.length + 1));
  };

  const handleInputBlur = useCallback(() => {
    const { text } = note;

    if (text.length) saveNote();
    else resetNote();

    setFocused(false);
  }, [note]);

  const removeLabel = (labelToRemove) => {
    setNote({
      ...note,
      labels: note.labels.filter((l) => l !== labelToRemove)
    });
  };

  // Either save the note or reset it when clicking outside the input
  useOnClickOutside(containerRef, handleInputBlur);

  // Constants
  const { title, text, labels } = note;

  return (
    <Paper ref={containerRef} className={classes.paper}>
      {focused && (
        <InputBase
          fullWidth
          name="title"
          placeholder="Title"
          value={title}
          onChange={onInputChange}
          className={classes.title}
        />
      )}
      <InputBase
        fullWidth
        name="text"
        placeholder="Take a note..."
        value={text}
        onFocus={onFocus}
        onChange={onInputChange}
        multiline
      />
      {focused && (
        <>
          <NoteLabels labels={labels} onRemove={removeLabel} />
          <Box display="flex" justifyContent="flex-end">
            <Button onClick={handleInputBlur} className={classes.button}>
              Save
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
};

NoteInput.propTypes = {
  label: PropTypes.string
};

NoteInput.defaultProps = {
  label: ''
};

export default NoteInput;
