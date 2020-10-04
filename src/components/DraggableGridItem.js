import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

import { makeStyles } from '@material-ui/core/styles';

import dndTypes from '../constants/dndTypes';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    cursor: 'move',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius
  }
}));

// Adapted from https://react-dnd.github.io/react-dnd/examples/sortable/simple
const DraggableGridItem = ({ currentItem, onDrop }) => {
  // Hooks
  const classes = useStyles();
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

  return (
    <div ref={ref} className={classes.gridItem} style={{ opacity }}>
      {currentItem.text}
    </div>
  );
};

DraggableGridItem.propTypes = {
  currentItem: PropTypes.shape({
    id: PropTypes.number,
    index: PropTypes.number,
    text: PropTypes.string
  }).isRequired,
  onDrop: PropTypes.func.isRequired
};

export default DraggableGridItem;
