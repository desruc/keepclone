import React, { useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { SAVE_LOCAL_NOTE } from '../redux/types';
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
  button: {
    textTransform: 'none',
    fontWeight: 500
  }
}));

const NoteInput = () => {
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
    text: '',
    labels: []
  });

  // Local state
  const [focused, setFocused] = useState(false);
  const [note, setNote] = useState(getEmptyTextNote(notes.length));

  // Event handlers
  const onFocus = () => setFocused(true);

  const onTextChange = (e) => {
    const { value } = e.target;
    setNote({
      ...note,
      text: value
    });
  };

  const resetNote = () => {
    setNote({
      ...note,
      text: ''
    });
  };

  const saveLocalNote = () =>
    dispatch({
      type: SAVE_LOCAL_NOTE,
      note
    });

  const saveFirebaseNote = () => {
    // Allow firebase to set its own id
    const { id, ...rest } = note;
    dispatch(attemptAddNote(authUser, { ...rest }));
  };

  const saveNote = () => {
    if (authUser) saveFirebaseNote();
    else saveLocalNote();

    setNote(getEmptyTextNote(notes.length + 1));
  };

  const handleInputBlur = useCallback(() => {
    const { text } = note;

    if (text.length) saveNote();
    else resetNote();

    setFocused(false);
  }, [note]);

  // Either save the note or reset it when clicking outside the input
  useOnClickOutside(containerRef, handleInputBlur);

  // Constants
  const { text } = note;

  return (
    <Paper ref={containerRef} className={classes.paper}>
      <InputBase
        fullWidth
        placeholder="Take a note..."
        value={text}
        onFocus={onFocus}
        onChange={onTextChange}
        multiline
      />
      {focused && (
        <Box display="flex" justifyContent="flex-end">
          <Button onClick={handleInputBlur} className={classes.button}>
            Save
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default NoteInput;
