import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';

export const DeleteItem = ({ onClick }) => (
  <IconButton
    title="Delete item"
    aria-label="delete-item"
    size="small"
    onClick={onClick}
  >
    <DeleteRoundedIcon />
  </IconButton>
);

DeleteItem.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const RestoreItem = ({ onClick }) => (
  <IconButton
    title="Restore item"
    aria-label="restore-item"
    size="small"
    onClick={onClick}
  >
    <RestoreFromTrashRoundedIcon />
  </IconButton>
);

RestoreItem.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const PermanentlyDeleteItem = ({ onClick }) => (
  <IconButton
    title="Delete forever"
    aria-label="delete-item-forever"
    size="small"
    onClick={onClick}
  >
    <DeleteForeverRoundedIcon />
  </IconButton>
);

PermanentlyDeleteItem.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const ChangeLabels = ({ onClick }) => (
  <IconButton
    title="Change labels"
    aria-label="change-labels"
    size="small"
    onClick={onClick}
  >
    <LabelOutlinedIcon />
  </IconButton>
);

ChangeLabels.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const ChangeColour = ({ onClick }) => (
  <IconButton
    title="Change colour"
    aria-label="change-colour"
    size="small"
    onClick={onClick}
  >
    <BrushOutlinedIcon />
  </IconButton>
);

ChangeColour.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const ArchiveNote = ({ onClick }) => (
  <IconButton
    title="Archive"
    aria-label="archive-note"
    size="small"
    onClick={onClick}
  >
    <ArchiveOutlinedIcon />
  </IconButton>
);

ArchiveNote.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const UnarchiveNote = ({ onClick }) => (
  <IconButton
    title="Unrchive"
    aria-label="unarchive-note"
    size="small"
    onClick={onClick}
  >
    <UnarchiveOutlinedIcon />
  </IconButton>
);

UnarchiveNote.propTypes = {
  onClick: PropTypes.func.isRequired
};
