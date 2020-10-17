import React from 'react';
import { useSelector } from 'react-redux';

import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import NoteToolbar from '../components/NoteToolbar/NoteToolbar';

import { selectTrashedNotes } from '../redux/reducer';

const Trash = () => {
  // Redux
  const trashedNotes = useSelector((state) => selectTrashedNotes(state));

  const noNotes = !trashedNotes.length;

  return (
    <main>
      {noNotes && <NoNotes icon="trash" message="No notes in Trash" />}
      {trashedNotes.length > 0 && (
        <section>
          <Grid>
            {trashedNotes
              .sort((a, b) => a.index - b.index)
              .map((e) => (
                <GridItem
                  key={e.id}
                  currentItem={e}
                  footerComponent={
                    <NoteToolbar note={e} restoreItem deleteForever />
                  }
                />
              ))}
          </Grid>
        </section>
      )}
    </main>
  );
};

export default Trash;
