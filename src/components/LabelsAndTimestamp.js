import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NoteLabels from './NoteLabels';

import { getFormattedDate } from '../utils/helpers';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(1)
  },
  time: {
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(0.5)
    },
    color: theme.palette.text.disabled,
    fontSize: '0.75rem',
    letterSpacing: '0.0.25rem'
  }
}));

const LabelsAndTimestamp = ({ onRemoveLabel, note }) => {
  const classes = useStyles();

  const { archived, trashed, labels, timestamp } = note;

  const formattedDate = getFormattedDate(timestamp);

  const getTimeMessage = () => {
    if (!formattedDate) return '';
    if (trashed) return `Note in Trash . Edited ${formattedDate}`;
    if (archived) return `Note in Archive . Edited ${formattedDate}`;
    return `Edited ${formattedDate}`;
  };

  const computedDateMessage = getTimeMessage();

  const hasTimestamp = Boolean(computedDateMessage);

  return (
    <Grid container spacing={1} className={classes.container}>
      <Grid item xs={12} md={hasTimestamp ? 6 : 12}>
        <NoteLabels labels={labels} onRemove={onRemoveLabel} noMargin />
      </Grid>
      {hasTimestamp && (
        <Grid item xs={12} md={6}>
          <Typography align="right" className={classes.time}>
            {computedDateMessage}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

LabelsAndTimestamp.propTypes = {
  onRemoveLabel: PropTypes.func,
  note: PropTypes.shape({
    id: PropTypes.string,
    index: PropTypes.number,
    title: PropTypes.string,
    text: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string),
    backgroundColor: PropTypes.string,
    archived: PropTypes.bool,
    trashed: PropTypes.bool,
    timestamp: PropTypes.shape({
      seconds: PropTypes.number,
      nanoseconds: PropTypes.number,
      toDate: PropTypes.func
    })
  }).isRequired
};

LabelsAndTimestamp.defaultProps = {
  onRemoveLabel: null
};

export default LabelsAndTimestamp;
