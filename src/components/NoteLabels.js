import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  wrap: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  hidden: {
    display: 'hidden'
  },
  chip: {
    marginRight: theme.spacing(0.725)
  }
}));

const NoteLabels = ({ clickable, onRemove, labels }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnClick = (label) => history.push(`/label/${label}`);

  const hasLabels = labels.length > 0;

  const wrapClass = clsx({
    [classes.wrap]: hasLabels,
    [classes.hidden]: !hasLabels
  });

  return (
    <div className={wrapClass}>
      {labels.map((label) => {
        return (
          <Chip
            key={label}
            clickable={clickable}
            label={label}
            onClick={clickable ? () => handleOnClick(label) : null}
            onDelete={() => onRemove(label)}
            size="small"
            variant="outlined"
            className={classes.chip}
          />
        );
      })}
    </div>
  );
};

NoteLabels.propTypes = {
  clickable: PropTypes.bool,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemove: PropTypes.func.isRequired
};

NoteLabels.defaultProps = {
  clickable: false
};

export default NoteLabels;
