import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LabelOutlined from '@material-ui/icons/LabelOutlined';

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& .MuiSvgIcon-root': {
      fontSize: 120
    }
  },
  icon: {
    margin: 20,
    opacity: 0.2
  },
  typography: {
    fontWeight: 600,
    fontSize: '1.375rem',
    color: theme.palette.text.disabled,
    cursor: 'default'
  }
}));

const NoNotes = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrap}>
      <LabelOutlined className={classes.icon} fontSize="inherit" />
      <Typography className={classes.typography} component="h3">
        No notes with this label yet
      </Typography>
    </div>
  );
};

export default NoNotes;
