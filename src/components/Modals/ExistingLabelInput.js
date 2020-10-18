import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: `${theme.spacing(1)}px 0px`
  },
  iconButton: {
    margin: `0px ${theme.spacing(1)}px`
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
  }
}));

const ExistingLabelInput = ({ labelId, label, onDelete, onChange, onSave }) => {
  // Hooks
  const classes = useStyles();

  // Refs
  const inputRef = useRef(null);

  // State
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [original, setOriginal] = useState(label);

  // Event handlers
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);
  const markFocused = () => setFocused(true);
  const unmarkFocused = () => setFocused(false);

  const focusInput = () => {
    inputRef.current.focus();
    markFocused();
  };

  const handleSave = () => {
    setOriginal(label);
    onSave(labelId);
    unmarkFocused();
  };

  // Constants
  const hasUpdated = label !== original;

  return (
    <ListItem
      className={classes.listItem}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <IconButton
        size="small"
        className={classes.iconButton}
        onClick={() => onDelete({ id: labelId, label })}
      >
        {hover ? <DeleteIcon /> : <LabelOutlinedIcon />}
      </IconButton>
      <Input
        inputRef={inputRef}
        value={label}
        aria-label={`${label.replace(/\s/g, '-')}-label-input`}
        classes={{ underline: classes.inputUnderline }}
        onFocus={markFocused}
        // onBlur={unmarkFocused}
        onChange={onChange(labelId)}
      />
      <IconButton
        size="small"
        className={classes.iconButton}
        onClick={focused || hasUpdated ? handleSave : focusInput}
      >
        {hasUpdated || focused ? <DoneIcon /> : <EditOutlinedIcon />}
      </IconButton>
    </ListItem>
  );
};

ExistingLabelInput.propTypes = {
  labelId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default ExistingLabelInput;
