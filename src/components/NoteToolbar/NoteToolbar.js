import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import {
  ArchiveNote,
  UnarchiveNote,
  DeleteItem,
  PermanentlyDeleteItem,
  RestoreItem
} from './NoteToolbarButtons';

import ChangeBackgroundButton from './ChangeBackgroundButton';
import UpdateLabelsButton from './UpdateLabelsButton';

import {
  attemptArchiveNote,
  attemptUnarchiveNote,
  attemptDeleteNote,
  attemptRestoreNote,
  attemptPermenatlyDeleteNote,
  attemptBackgroundChange,
  attemptToggleLabel
} from '../../redux/actions';

import { selectUser } from '../../redux/reducer';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    opacity: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    transition: theme.transitions.create(['opacity'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '& .MuiButtonBase-root:not(:last-child)': {
      marginRight: theme.spacing(1)
    },
    '& .MuiSvgIcon-root': {
      height: 18,
      width: 18
    }
  }
}));

const NoteToolbar = ({
  note,
  deleteItem,
  restoreItem,
  deleteForever,
  changeLabels,
  changeColour,
  archiveItem,
  unarchiveItem
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => selectUser(state));

  // Event handlers
  const onArchiveNote = () => dispatch(attemptArchiveNote(authUser, note));

  const onUnarchiveNote = () => dispatch(attemptUnarchiveNote(authUser, note));

  const onDeleteNote = () => dispatch(attemptDeleteNote(authUser, note));

  const onRestoreNote = () => dispatch(attemptRestoreNote(authUser, note));

  const onPermanetlyDeleteNote = () =>
    dispatch(attemptPermenatlyDeleteNote(authUser, note));

  const onChangeLabel = (label) =>
    dispatch(attemptToggleLabel(authUser, note, label));

  const onChangeBackground = (color) => {
    dispatch(attemptBackgroundChange(authUser, note, color));
  };

  const { backgroundColor, labels: noteLabels } = note;

  return (
    <div className={clsx(classes.toolbar, 'note-toolbar')}>
      {changeColour && (
        <ChangeBackgroundButton
          onChange={onChangeBackground}
          currentColor={backgroundColor}
        />
      )}
      {changeLabels && (
        <UpdateLabelsButton noteLabels={noteLabels} onChange={onChangeLabel} />
      )}
      {archiveItem && <ArchiveNote onClick={onArchiveNote} />}
      {unarchiveItem && <UnarchiveNote onClick={onUnarchiveNote} />}
      {deleteItem && <DeleteItem onClick={onDeleteNote} />}
      {deleteForever && (
        <PermanentlyDeleteItem onClick={onPermanetlyDeleteNote} />
      )}
      {restoreItem && <RestoreItem onClick={onRestoreNote} />}
    </div>
  );
};

NoteToolbar.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    backgroundColor: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  deleteItem: PropTypes.bool,
  restoreItem: PropTypes.bool,
  deleteForever: PropTypes.bool,
  changeLabels: PropTypes.bool,
  changeColour: PropTypes.bool,
  archiveItem: PropTypes.bool,
  unarchiveItem: PropTypes.bool
};

NoteToolbar.defaultProps = {
  deleteItem: false,
  restoreItem: false,
  deleteForever: false,
  changeLabels: false,
  changeColour: false,
  archiveItem: false,
  unarchiveItem: false
};

export default NoteToolbar;
