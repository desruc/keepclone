import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import isEqual from 'lodash.isequal';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import ModalBase from './ModalBase';
import NewLabelInput from './NewLabelInput';
import ExistingLabelInput from './ExistingLabelInput';
import ConfirmationModal from './ConfirmationModal';

import { selectUser, selectLabels, selectAllNotes } from '../../redux/reducer';

import { randomId } from '../../utils/helpers';

import {
  attemptAddLabel,
  attemptBulkUpdateLabel,
  attemptUpdateLabel,
  attemptDeleteLabel
} from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingBottom: theme.spacing(1.25)
  },
  listWrap: {
    width: 300,
    padding: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  list: {
    maxHeight: 350,
    overflow: 'auto'
  },
  title: {
    fontWeight: 500
  },
  closeWrap: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

/**
 * Consolidates local state and redux state
 * @param {Array} prevLabels array of existing labels
 * @param {Array} labels updated array of labels from redux
 */
const consolidateLabels = (prevLabels, labels) => {
  const consolidated = [];

  labels.forEach((l) => {
    const existed = prevLabels.find((p) => p.id === l.id);
    if (existed) return consolidated.push(existed);
    return consolidated.push(l);
  });

  return consolidated;
};

const ManageLabelsModal = ({ open, closeModal }) => {
  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // Redux
  const authUser = useSelector((state) => selectUser(state));
  const labels = useSelector((state) => selectLabels(state));
  const notes = useSelector((state) => selectAllNotes(state));

  // New label state
  const [newLabelState, setNewLabelState] = useState({
    id: randomId(),
    label: ''
  });

  // Existing label state
  const [existingLabels, setExistingLabels] = useState(
    consolidateLabels([], labels)
  );

  // Confirmation modal open state
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);

  // Add new labels to stack for editing
  useEffect(() => {
    if (!isEqual(existingLabels, labels)) {
      setExistingLabels(consolidateLabels(existingLabels, labels));
    }
  }, [labels]);

  // Event handlers
  const onDeleteLabel = (label) => {
    setSelectedLabel(label);
    setConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setConfirmationOpen(false);
    setSelectedLabel(null);
  };

  const confirmDeleteLabel = () => {
    history.push('/');
    dispatch(attemptDeleteLabel(authUser, selectedLabel, notes));
    closeConfirmationModal();
  };

  const clearNewLabel = () => {
    setNewLabelState({
      ...newLabelState,
      label: ''
    });
  };

  const handleNewLabelChange = (e) => {
    const { value } = e.target;
    setNewLabelState({
      ...newLabelState,
      label: value
    });
  };

  const saveNewLabel = () => {
    const { label } = newLabelState;

    // Check if the label already exists - don't add duplicates
    const labelExists = labels.some((l) => l === label);
    const emptyLabel = !label.trim().length;

    if (!labelExists && !emptyLabel)
      dispatch(attemptAddLabel(authUser, newLabelState));

    // Clear input
    setNewLabelState({
      id: randomId(),
      label: ''
    });
  };

  const handleExistingLabelChange = (id) => (e) => {
    const { value } = e.target;

    const updatedLabels = existingLabels.map((l) => {
      if (l.id === id) return { id, label: value };
      return l;
    });

    setExistingLabels(updatedLabels);
  };

  const saveExistingLabel = (id) => {
    const label = existingLabels.find((e) => e.id === id);
    dispatch(attemptUpdateLabel(authUser, label));
  };

  const saveAllChanges = () => {
    // Find all of the existing labels that have been changed (firebase approach)
    const labelChanges = [];
    labels.forEach((l) => {
      const local = existingLabels.find((e) => e.id === l.id);
      if (!isEqual(local.label, l.label)) labelChanges.push(local);
    });

    // Check if the new label already exists - don't add duplicates
    const { label } = newLabelState;
    const labelExists = labels.some((l) => l === label);
    const emptyLabel = !label.trim().length;

    // Check if new label needs to be added to update state (firebase approach)
    if (!labelExists && !emptyLabel) {
      dispatch(attemptAddLabel(authUser, newLabelState));
      setNewLabelState({
        id: randomId(),
        label: ''
      });
    }

    if (labelChanges.length > 0) {
      dispatch(attemptBulkUpdateLabel(authUser, labelChanges));
    }
  };

  const handleClose = () => {
    saveAllChanges();
    closeModal();
  };

  // Constants
  const { label } = newLabelState;

  return (
    <ModalBase
      open={open}
      handleClose={handleClose}
      paperClassName={classes.paper}
    >
      <div className={classes.listWrap}>
        <Typography className={classes.title}>Edit labels</Typography>
        <List className={classes.list}>
          <NewLabelInput
            label={label}
            clearInput={clearNewLabel}
            onChange={handleNewLabelChange}
            onSave={saveNewLabel}
          />
          {existingLabels.map(({ id, label: existingLabel }) => (
            <ExistingLabelInput
              key={id}
              labelId={id}
              label={existingLabel}
              onChange={handleExistingLabelChange}
              onSave={saveExistingLabel}
              onDelete={onDeleteLabel}
            />
          ))}
        </List>
      </div>
      <div className={classes.closeWrap}>
        <Button onClick={handleClose}>Done</Button>
      </div>
      <ConfirmationModal
        open={confirmationOpen}
        handleClose={closeConfirmationModal}
        confirmButtonLabel="Delete"
        prompt="We’ll delete this label and remove it from all of your Keep Clone notes. Your notes won’t be deleted."
        onConfirm={confirmDeleteLabel}
      />
    </ModalBase>
  );
};

ManageLabelsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default ManageLabelsModal;
