import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
  noteId,
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

  // Event handlers
  const onArchiveNote = () => {
    dispatch({
      type: types.ARCHIVE_LOCAL_NOTE,
      noteId
    });
  };

  const onUnarchiveNote = () => {
    dispatch({
      type: types.UNARCHIVE_LOCAL_NOTE,
      noteId
    });
  };

  const onDeleteNote = () => {
    dispatch({
      type: types.DELETE_LOCAL_NOTE,
      noteId
    });
  };

  const onRestoreNote = () => {
    dispatch({
      type: types.RESTORE_LOCAL_NOTE,
      noteId
    });
  };

  const onPermanetlyDeleteNote = () => {
    dispatch({
      type: types.PERMANETLY_DELETE_LOCAL_NOTE,
      noteId
    });
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
  noteId: PropTypes.string.isRequired,
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
