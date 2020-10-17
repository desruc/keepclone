import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';

import NoteInput from '../components/NoteInput';
import NoNotes from '../components/NoNotes';
import Grid from '../components/Grid';
import DraggableGridItem from '../components/DraggableGridItem';
import NoteToolbar from '../components/NoteToolbar/NoteToolbar';

import { reorderFbNotes } from '../firebase/fbDb';

import { REORDER_LOCAL_NOTES } from '../redux/types';
import { selectActiveNotes, selectUser } from '../redux/reducer';

const Notes = () => {
  // Hooks
  const dispatch = useDispatch();

  // Redux
  const authUser = useSelector((state) => selectUser(state));
  const notes = useSelector((state) => selectActiveNotes(state));

  // Event handlers
  const reorderLocalItems = (newNotes) => {
    dispatch({
      type: REORDER_LOCAL_NOTES,
      notes: newNotes
    });
  };

  const reorderItems = useCallback(
    (firstItemId, secondItemId) => {
      const newNotes = cloneDeep(notes);
      const firstItem = newNotes.find((i) => i.id === firstItemId);
      const secondItem = newNotes.find((i) => i.id === secondItemId);
      const firstIndex = firstItem.index;
      firstItem.index = secondItem.index;
      secondItem.index = firstIndex;

      if (authUser) reorderFbNotes(firstItem, secondItem, authUser);
      else reorderLocalItems(newNotes);
    },
    [notes, authUser]
  );

  const noNotes = !notes.length;

  return (
    <main>
      <NoteInput />
      {noNotes && (
        <NoNotes icon="notes" message="There's nothing here yet..." />
      )}
      <Grid>
        {notes
          .sort((a, b) => a.index - b.index)
          .map((e) => (
            <DraggableGridItem
              key={e.id}
              currentItem={e}
              onDrop={reorderItems}
              footerComponent={
                <NoteToolbar
                  noteId={e.id}
                  changeLabels
                  changeColour
                  archiveItem
                  deleteItem
                />
              }
            />
          ))}
      </Grid>
    </main>
  );
};

export default Notes;
