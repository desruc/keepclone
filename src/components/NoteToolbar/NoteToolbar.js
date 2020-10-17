import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import {
  ChangeColour,
  ChangeLabels,
  ArchiveNote,
  UnarchiveNote,
  DeleteItem,
  PermanentlyDeleteItem,
  RestoreItem
} from './NoteToolbarButtons';

import {
  archiveFirebaseNote,
  unarchiveFirebaseNote,
  deleteFirebaseNote,
  restoreFirebaseNote,
  permanentlyDeleteFirebaseNote
} from '../../redux/actions';

import { selectUser } from '../../redux/reducer';

import * as types from '../../redux/types';

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

  const { id: noteId } = note;

  const updateLocalNote = (type, label = '', bg = '') => {
    dispatch({
      type,
      noteId,
      label,
      bg
    });
  };

  // Event handlers
  const onArchiveNote = () => {
    if (authUser) dispatch(archiveFirebaseNote(authUser, note));
    else updateLocalNote(types.ARCHIVE_LOCAL_NOTE);
  };

  const onUnarchiveNote = () => {
    console.log('test');
    if (authUser) dispatch(unarchiveFirebaseNote(authUser, note));
    else updateLocalNote(types.UNARCHIVE_LOCAL_NOTE);
  };

  const onDeleteNote = () => {
    if (authUser) dispatch(deleteFirebaseNote(authUser, note));
    else updateLocalNote(types.DELETE_LOCAL_NOTE);
  };

  const onRestoreNote = () => {
    if (authUser) dispatch(restoreFirebaseNote(authUser, note));
    else updateLocalNote(types.RESTORE_LOCAL_NOTE);
  };

  const onPermanetlyDeleteNote = () => {
    if (authUser) dispatch(permanentlyDeleteFirebaseNote(authUser, note));
    else updateLocalNote(types.PERMANETLY_DELETE_LOCAL_NOTE);
  };

  const onChangeLabel = () => {
    // TODO
  };

  const onChangeColour = () => {
    // TODO
  };

  return (
    <div className={clsx(classes.toolbar, 'note-toolbar')}>
      {changeColour && <ChangeColour onClick={onChangeColour} />}
      {changeLabels && <ChangeLabels onClick={onChangeLabel} />}
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
    id: PropTypes.string
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
