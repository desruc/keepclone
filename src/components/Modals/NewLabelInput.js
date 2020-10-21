import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  listItem: {
    justifyContent: 'space-between',
    padding: `${theme.spacing(1)}px 0px`,
    '& .MuiSvgIcon-root': {
      height: 18,
      width: 18
    }
  },
  iconButton: {
    margin: `0px ${theme.spacing(1)}px`
  },
  inputRoot: {
    fontSize: 14
  },
  inputUnderline: {
    borderColor: 'transparent',
    '&:hover:before,&:before': {
      borderColor: 'transparent !important',
      borderWidth: '1px !important'
    },
    '&:after': {
      borderColor: theme.palette.divider
    }
  },
  invisible: {
    opacity: 0
  }
}));

const NewLabelInput = ({ label, clearInput, onChange, onSave }) => {
  // Hooks
  const classes = useStyles();

  // Refs
  const inputRef = useRef(null);

  // Local state
  const [focused, setFocused] = useState(false);

  // Event handlers
  const markFocused = () => setFocused(true);
  const unmarkFocused = () => setFocused(false);

  const focusInput = () => {
    inputRef.current.focus();
    markFocused();
  };

  const handleClear = () => {
    unmarkFocused();
    clearInput();
  };

  const handleSave = () => {
    // Focus the input again if it had a value
    if (label.trim().length > 0) focusInput();
    else unmarkFocused();

    onSave();
  };

  const hasValue = label.trim().length > 0;

  const saveButtonClass = clsx({
    [classes.iconButton]: true,
    [classes.invisible]: !focused
  });

  return (
    <ListItem className={classes.listItem}>
      <IconButton
        size="small"
        className={classes.iconButton}
        onClick={focused || hasValue ? handleClear : focusInput}
      >
        {focused || hasValue ? <CloseIcon /> : <AddIcon />}
      </IconButton>
      <Input
        inputRef={inputRef}
        aria-label="new-label-input"
        placeholder="Create new label"
        value={label}
        onChange={onChange}
        onFocus={markFocused}
        // onBlur={unmarkFocused}
        classes={{ root: classes.inputRoot, underline: classes.inputUnderline }}
      />
      <IconButton
        size="small"
        className={saveButtonClass}
        onClick={handleSave}
      >
        <DoneIcon />
      </IconButton>
    </ListItem>
  );
};

NewLabelInput.propTypes = {
  label: PropTypes.string.isRequired,
  clearInput: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default NewLabelInput;
