import React from 'react';
import { useSelector } from 'react-redux';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { selectAppInitialized } from '../redux/reducer';

const FullscreenLoader = () => {
  const initialized = useSelector((state) => selectAppInitialized(state));
  return (
    <Backdrop open={!initialized} style={{ zIndex: 1300 }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default FullscreenLoader;
