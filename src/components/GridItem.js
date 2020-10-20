import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import NoteLabels from './NoteLabels';

import { attemptToggleLabel } from '../redux/actions';
import { selectUser } from '../redux/reducer';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    '&:hover': {
      '& .note-toolbar': {
        opacity: 1
      }
    }
  },
  dragging: {
    opacity: 0
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.75)
  },
  content: {
    fontSize: '0.825rem',
    flex: 1,
    whiteSpace: 'pre-line'
  }
}));

const GridItem = ({ currentItem, footerComponent }) => {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => selectUser(state));
  const handleRemoveLabel = (label) =>
    dispatch(attemptToggleLabel(authUser, currentItem, label));

  const { title, text, labels } = currentItem;

  return (
    <div className={classes.gridItem}>
      <div className={classes.inner}>
        {title && <div className={classes.title}>{title}</div>}
        <div className={classes.content}>{text}</div>
        <NoteLabels clickable labels={labels} onRemove={handleRemoveLabel} />
        {footerComponent}
      </div>
    </div>
  );
};

GridItem.propTypes = {
  currentItem: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  footerComponent: PropTypes.node
};

GridItem.defaultProps = {
  footerComponent: null
};

export default GridItem;
