import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import { useMasonryLayout } from '../utils/hooks';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridGap: 15,
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))',
    gridAutoRows: 180
  }
});

const Grid = ({ children }) => {
  // Hooks
  const classes = useStyles();
  const gridRef = useRef(null);
  useMasonryLayout(gridRef);

  return (
    <div ref={gridRef} className={classes.grid}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired
};

export default Grid;
