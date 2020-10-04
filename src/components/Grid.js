import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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

  return <Box className={classes.grid}>{children}</Box>;
};

Grid.propTypes = {
  children: PropTypes.node.isRequired
};

export default Grid;
