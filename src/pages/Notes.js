import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cloneDeep from 'lodash.clonedeep';

import NoteInput from '../components/NoteInput';
import Grid from '../components/Grid';
import DraggableGridItem from '../components/DraggableGridItem';

import { REORDER_LOCAL_NOTES } from '../redux/types';
import { selectNotes } from '../redux/reducer';

const Notes = () => {
  // Hooks
  const dispatch = useDispatch();

  // Redux
  const notes = useSelector((state) => selectNotes(state));

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
      reorderLocalItems(newNotes);
    },
    [notes]
  );

  return (
    <main>
      <NoteInput />
      <Grid>
        {notes
          .sort((a, b) => a.index - b.index)
          .map((e) => (
            <DraggableGridItem
              key={e.id}
              currentItem={e}
              onDrop={reorderItems}
            />
          ))}
      </Grid>
    </main>
  );
};

export default Notes;
