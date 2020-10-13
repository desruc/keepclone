import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import NoteToolbar from '../components/NoteToolbar/NoteToolbar';

import {
  selectActiveNotes,
  selectArchivedNotes,
  selectLabels
} from '../redux/reducer';

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
  const activeNotes = useSelector((state) => selectActiveNotes(state));
  const archivedNotes = useSelector((state) => selectArchivedNotes(state));

  const matchedLabelObject = allLabels.find(
    ({ label }) => label === labelParam
  );

  if (!matchedLabelObject) return <Redirect to="/404" />;

  const filteredActiveNotes = activeNotes.filter(({ labels }) =>
    labels.some((l) => l === matchedLabelObject.label)
  );

  const filteredArchivedNotes = archivedNotes.filter(({ labels }) =>
    labels.some((l) => l === matchedLabelObject.label)
  );

  const noNotes = !filteredActiveNotes.length && !filteredArchivedNotes.length;

  return (
    <main>
      {noNotes && <NoNotes />}
      {activeNotes.length > 0 && (
        <section>
          <Grid>
            {filteredActiveNotes
              .sort((a, b) => a.index - b.index)
              .map((e) => (
                <GridItem
                  key={e.id}
                  currentItem={e}
                  footerComponent={
                    <NoteToolbar
                      noteId={e.id}
                      archiveItem
                      deleteItem
                      changeLabels
                      changeColour
                    />
                  }
                />
              ))}
          </Grid>
        </section>
      )}
      {filteredArchivedNotes.length > 0 && (
        <section className={classes.archive}>
          <Typography className={classes.label}>Archive</Typography>
          <Grid>
            {archivedNotes.map((e) => (
              <GridItem
                key={e.id}
                currentItem={e}
                footerComponent={
                  <NoteToolbar
                    noteId={e.id}
                    unarchiveItem
                    deleteItem
                    changeLabels
                    changeColour
                  />
                }
              />
            ))}
          </Grid>
        </section>
      )}
    </main>
  );
};

export default LabelNotes;