import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

import NoteLabels from './NoteLabels';

import dndTypes from '../constants/dndTypes';

import { EDIT_NOTE_MODAL_OPEN_STATE, SET_SELECTED_NOTE } from '../redux/types';
import { attemptToggleLabel } from '../redux/actions';
import { selectUser } from '../redux/reducer';

import { backgroundColorStyles } from '../constants/backgroundColors';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    cursor: 'default',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    transition: theme.transitions.create(['box-shadow', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '&:hover': {
      boxShadow: theme.shadows[3],
      '& .note-toolbar': {
        opacity: 1
      }
    }
  },
  dragging: {
    opacity: 0
  },
  inner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '1rem',
    fontWeight: 500,
    marginBottom: theme.spacing(0.75)
  },
  content: {
    fontSize: '0.825rem',
    whiteSpace: 'pre-line'
  },
  footer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  ...backgroundColorStyles(theme)
}));

// Adapted from https://react-dnd.github.io/react-dnd/examples/sortable/simple
const DraggableGridItem = ({ currentItem, onDrop, footerComponent }) => {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const ref = useRef(null);

  // Create drop target
  const [, drop] = useDrop({
    accept: dndTypes.GRID_ITEM,
    hover(otherItem, monitor) {
      if (!ref.current) return;

      const dragIndex = otherItem.index;
      const hoverIndex = currentItem.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.right;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height or width
      // When dragging downwards or right to left, only move when the cursor is below 50%
      if (
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY &&
        hoverClientX < hoverMiddleX
      ) {
        return;
      }
      // When dragging upwards or left to right, only move when the cursor is above 50%
      if (
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY &&
        hoverClientX > hoverMiddleX
      ) {
        return;
      }

      // Time to actually perform the action
      onDrop(otherItem.id, currentItem.id);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      otherItem.index = currentItem.index; // eslint-disable-line
    }
  });

  // Enable dragging
  const [{ isDragging }, drag] = useDrag({
    item: { type: dndTypes.GRID_ITEM, ...currentItem },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  const authUser = useSelector((state) => selectUser(state));
  const handleRemoveLabel = (label) =>
    dispatch(attemptToggleLabel(authUser, currentItem, label));

  const setSelectedNote = () => {
    dispatch({ type: SET_SELECTED_NOTE, note: currentItem });
    dispatch({ type: EDIT_NOTE_MODAL_OPEN_STATE, state: true });
  };

  const { title, text, labels, backgroundColor } = currentItem;

  const gridItemClass = clsx({
    [classes.gridItem]: true,
    [classes.dragging]: isDragging,
    [classes[backgroundColor]]: true
  });

  return (
    <div
      ref={ref}
      className={gridItemClass}
      style={{ opacity }}
      onClick={setSelectedNote}
      role="presentation"
    >
      <div className={classes.inner}>
        <div className={classes.contentWrap}>
          {title && <div className={classes.title}>{title}</div>}
          <div className={classes.content}>{text}</div>
        </div>
        <div className={classes.footer}>
          <NoteLabels clickable labels={labels} onRemove={handleRemoveLabel} />
          {footerComponent}
        </div>
      </div>
    </div>
  );
};

DraggableGridItem.propTypes = {
  currentItem: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    backgroundColor: PropTypes.string
  }).isRequired,
  onDrop: PropTypes.func.isRequired,
  footerComponent: PropTypes.node
};

DraggableGridItem.defaultProps = {
  footerComponent: null
};

export default DraggableGridItem;
