import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import NoteLabels from './NoteLabels';

import { attemptToggleLabel } from '../redux/actions';
import { selectUser } from '../redux/reducer';

import { backgroundColorStyles } from '../constants/backgroundColors';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    transition: theme.transitions.create(['box-shadow', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&:hover': {
      '& .note-toolbar': {
        opacity: 1
      }
    }
  },
  inner: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  title: {
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: theme.spacing(0.75)
  },
  content: {
    fontSize: '0.825rem',
    flex: 1,
    whiteSpace: 'pre-line'
  },
  ...backgroundColorStyles(theme)
}));

const GridItem = ({ currentItem, onClick, footerComponent }) => {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  const authUser = useSelector((state) => selectUser(state));
  const handleRemoveLabel = (label) =>
    dispatch(attemptToggleLabel(authUser, currentItem, label));

  const { title, text, labels, backgroundColor, trashed } = currentItem;

  const gridItemClass = clsx({
    [classes.gridItem]: true,
    [classes[backgroundColor]]: true
  });

  return (
    <div
      className={gridItemClass}
      onClick={onClick ? () => onClick(currentItem) : null}
      role="presentation"
    >
      <div className={classes.inner}>
        {title && <div className={classes.title}>{title}</div>}
        <div className={classes.content}>{text}</div>
        <NoteLabels
          clickable
          labels={labels}
          onRemove={trashed ? null : handleRemoveLabel}
        />
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
    labels: PropTypes.arrayOf(PropTypes.string),
    backgroundColor: PropTypes.string.isRequired,
    trashed: PropTypes.bool.isRequired
  }).isRequired,
  footerComponent: PropTypes.node,
  onClick: PropTypes.func
};

GridItem.defaultProps = {
  footerComponent: null,
  onClick: null
};

export default GridItem;
