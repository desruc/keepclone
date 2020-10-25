import React from 'react';
import { useSelector } from 'react-redux';

import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import NoteToolbar from '../components/NoteToolbar/NoteToolbar';

import { selectArchivedNotes } from '../redux/reducer';

const Archive = () => {
  // Redux
  const archivedNotes = useSelector((state) => selectArchivedNotes(state));

  const noNotes = !archivedNotes.length;

  return (
    <main>
      {noNotes && (
        <NoNotes icon="notes" message="Nothing has been archived yet..." />
      )}
      {archivedNotes.length > 0 && (
        <section>
          <Grid>
            {archivedNotes
              .sort((a, b) => a.index - b.index)
              .map((e) => (
                <GridItem
                  key={e.id}
                  currentItem={e}
                  footerComponent={
                    <NoteToolbar
                      note={e}
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

export default Archive;
