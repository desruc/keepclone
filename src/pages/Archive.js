import React from 'react';
import { useSelector } from 'react-redux';

import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';

import { selectArchivedNotes } from '../redux/reducer';

const Archive = () => {
  // Redux
  const archivedNotes = useSelector((state) => selectArchivedNotes(state));

  const noNotes = !archivedNotes.length;

  return (
    <main>
      {noNotes && <NoNotes />}
      {archivedNotes.length > 0 && (
        <section>
          <Grid>
            {archivedNotes
              .sort((a, b) => a.index - b.index)
              .map((e) => (
                <GridItem key={e.id} currentItem={e} />
              ))}
          </Grid>
        </section>
      )}
    </main>
  );
};

export default Archive;
