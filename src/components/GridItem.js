import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

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
  content: {
    flex: 1
  }
}));

const GridItem = ({ currentItem, footerComponent }) => {
  // Hooks
  const classes = useStyles();

  return (
    <div className={classes.gridItem}>
      <div className={classes.inner}>
        <div className={classes.content}>{currentItem.text}</div>
        {footerComponent}
      </div>
    </div>
  );
};

GridItem.propTypes = {
  currentItem: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    text: PropTypes.string
  }).isRequired,
  footerComponent: PropTypes.node
};

GridItem.defaultProps = {
  footerComponent: null
};

export default GridItem;
