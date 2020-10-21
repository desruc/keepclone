import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import NotesIcon from '@material-ui/icons/Notes';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles((theme) => ({
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
    fontWeight: 500,
    fontSize: '1.375rem',
    color: theme.palette.text.disabled,
    cursor: 'default'
  }
}));

const NoNotes = ({ message, icon }) => {
  const classes = useStyles();

  const icons = {
    notes: NotesIcon,
    label: LabelOutlined,
    trash: DeleteOutlinedIcon
  };

  const ComputedIcon = icons[icon];

  return (
    <div className={classes.wrap}>
      <ComputedIcon className={classes.icon} fontSize="inherit" />
      <Typography className={classes.typography} component="h3">
        {message}
      </Typography>
    </div>
  );
};

NoNotes.propTypes = {
  icon: PropTypes.oneOf(['notes', 'label', 'trash']),
  message: PropTypes.string
};

NoNotes.defaultProps = {
  icon: 'notes',
  message: "There's nothing here..."
};

export default NoNotes;
