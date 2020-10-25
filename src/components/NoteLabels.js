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
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.725),
    fontSize: 11
  }
}));

const NoteLabels = ({ clickable, onRemove, labels, noMargin }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleOnClick = (e, label) => {
    e.stopPropagation();
    history.push(`/label/${label}`);
  };

  const handleRemove = (e, label) => {
    e.stopPropagation();
    onRemove(label);
  };

  const hasLabels = labels.length > 0;

  const wrapClass = clsx({
    [classes.wrap]: hasLabels && !noMargin,
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
            onClick={clickable ? (e) => handleOnClick(e, label) : null}
            onDelete={onRemove ? (e) => handleRemove(e, label) : null}
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
  onRemove: PropTypes.func,
  noMargin: PropTypes.bool
};

NoteLabels.defaultProps = {
  clickable: false,
  noMargin: false,
  onRemove: null
};

export default NoteLabels;
