import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

import ModalBase from './ModalBase';

import { selectLabels } from '../../redux/reducer';

import { SAVE_LOCAL_LABEL } from '../../redux/types';

const useStyles = makeStyles((theme) => ({
  listWrap: {
    width: 300,
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  title: {
    fontWeight: 500
  },
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
  },
  closeWrap: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiButton-label': {
      textTransform: 'none'
    }
  }
}));

const ManageLabelsModal = ({ open, closeModal }) => {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  // Refs
  const newLabelInput = useRef(null);

  // Local state
  const [newLabel, setNewLabel] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  console.log('ManageLabelsModal -> inputFocused', inputFocused);

  // Redux
  const labels = useSelector((state) => selectLabels(state));

  // Event handlers
  const markFocused = () => setInputFocused(true);
  const unmarkFocused = () => setInputFocused(false);
  const focusOnInput = () => {
    newLabelInput.current.focus();
    markFocused();
  };
  const emptyInput = () => {
    setNewLabel('');
    unmarkFocused();
  };

  const handleNewLabelChange = (e) => {
    const { value } = e.target;
    setNewLabel(value);
  };

  const saveLabel = () => {
    // Check if the label already exists - don't add duplicates
    const labelExists = labels.some((label) => label === newLabel);
    const emptyLabel = !newLabel.trim().length;
    if (!labelExists && !emptyLabel)
      dispatch({
        type: SAVE_LOCAL_LABEL,
        label: newLabel
      });

    // If there was a label - refocus on input
    if (!emptyLabel) focusOnInput();
    else unmarkFocused();

    // Clear input
    setNewLabel('');
  };

  const handleClose = () => {
    // TODO - save label
    if (newLabel.trim().length) saveLabel();
    unmarkFocused();
    closeModal();
  };

  return (
    <ModalBase open={open} handleClose={handleClose}>
      <div className={classes.listWrap}>
        <Typography className={classes.title}>Edit labels</Typography>
        <List>
          <ListItem className={classes.listItem}>
            <IconButton
              size="small"
              className={classes.iconButton}
              onClick={inputFocused ? emptyInput : focusOnInput}
            >
              {inputFocused ? <CloseIcon /> : <AddIcon />}
            </IconButton>
            <Input
              inputRef={newLabelInput}
              aria-label="new-label-input"
              placeholder="Create new label"
              value={newLabel}
              onChange={handleNewLabelChange}
              onFocus={markFocused}
              classes={{ underline: classes.inputUnderline }}
            />
            <IconButton
              size="small"
              className={classes.iconButton}
              onClick={saveLabel}
            >
              <DoneIcon />
            </IconButton>
          </ListItem>
          {labels.map((label) => (
            <ListItem>
              <Typography noWrap>{label}</Typography>
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.closeWrap}>
        <Button onClick={handleClose}>Done</Button>
      </div>
    </ModalBase>
  );
};

ManageLabelsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ManageLabelsModal;
