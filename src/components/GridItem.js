import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1)
  }
}));

const GridItem = ({ currentItem }) => {
  // Hooks
  const classes = useStyles();

  return (
    <div className={classes.gridItem}>
      <div>{currentItem.text}</div>
    </div>
  );
};

GridItem.propTypes = {
  currentItem: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    text: PropTypes.string
  }).isRequired
};

export default GridItem;
