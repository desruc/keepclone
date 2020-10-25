import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import GridItem from '../components/GridItem';
import NoteToolbar from '../components/NoteToolbar/NoteToolbar';
import ViewNoteModal from '../components/Modals/ViewNoteModal';

import { selectTrashedNotes } from '../redux/reducer';

const Trash = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const closeModal = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const onItemClick = (note) => {
    setSelectedNote(note);
    setModalOpen(true);
  };

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
                  onClick={onItemClick}
                  footerComponent={
                    <NoteToolbar note={e} restoreItem deleteForever />
                  }
                />
              ))}
          </Grid>
        </section>
      )}
      <ViewNoteModal
        open={modalOpen}
        handleClose={closeModal}
        note={selectedNote}
      />
    </main>
  );
};

export default Trash;
