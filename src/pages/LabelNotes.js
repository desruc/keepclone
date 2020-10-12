import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';

import { selectNotes, selectLabels } from '../redux/reducer';

const useStyles = makeStyles((theme) => ({
  archive: {
    marginTop: theme.spacing(4)
  },
  label: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
    fontSize: '0.75rem',
    fontWeight: 600
  }
}));

const LabelNotes = () => {
  // Hooks
  const classes = useStyles();
  const { label: labelParam } = useParams();

  // Redux
  const allLabels = useSelector((state) => selectLabels(state));
  const notes = useSelector((state) => selectNotes(state));

  const matchedLabelObject = allLabels.find(
    ({ label }) => label === labelParam
  );

  if (!matchedLabelObject) return <Redirect to="/404" />;

  const activeNotes = notes.filter(({ labels, archived }) =>
    labels.some((l) => l === matchedLabelObject.label && !archived)
  );

  const archivedNotes = notes.filter(({ labels, archived }) =>
    labels.some((l) => l === matchedLabelObject.label && archived)
  );

  const noNotes = !archivedNotes.length && !activeNotes.length;

  return (
    <main>
      {noNotes && <NoNotes />}
      {activeNotes.length > 0 && (
        <section>
          <Grid>
            {activeNotes
              .sort((a, b) => a.index - b.index)
              .map((e) => (
                <GridItem key={e.id} currentItem={e} />
              ))}
          </Grid>
        </section>
      )}
      {archivedNotes.length > 0 && (
        <section className={classes.archive}>
          <Typography className={classes.label}>Archive</Typography>
          <Grid>
            {archivedNotes.map((e) => (
              <GridItem key={e.id} currentItem={e} />
            ))}
          </Grid>
        </section>
      )}
    </main>
  );
};

export default LabelNotes;
