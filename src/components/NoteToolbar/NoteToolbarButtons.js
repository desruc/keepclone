import React, { useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';

import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import RestoreFromTrashRoundedIcon from '@material-ui/icons/RestoreFromTrashRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';

import ConfirmationModal from '../Modals/ConfirmationModal';

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

export const PermanentlyDeleteItem = ({ onClick }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const handleClick = (e) => {
    closeModal();
    onClick(e);
  };

  return (
    <>
      <IconButton
        title="Delete forever"
        aria-label="delete-item-forever"
        size="small"
        onClick={openModal}
      >
        <DeleteForeverRoundedIcon />
      </IconButton>
      <ConfirmationModal
        open={modalOpen}
        handleClose={closeModal}
        prompt="Are you sure you want to delete this note? It will be gone forever"
        onConfirm={handleClick}
      />
    </>
  );
};

PermanentlyDeleteItem.propTypes = {
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
