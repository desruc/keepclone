import React, { useState, useCallback } from 'react';

import DraggableGridItem from '../components/DraggableGridItem';

import Grid from '../components/Grid';

const Notes = () => {
  // Local state
  const [list, setList] = useState([
    {
      id: 1,
      index: 1,
      text: 'Write a cool JS library'
    },
    {
      id: 2,
      index: 2,
      text: 'Make it generic enough'
    },
    {
      id: 3,
      index: 3,
      text: 'Write README'
    }
  ]);

  // Event handlers
  const onDrop = useCallback(
    (firstItemId, secondItemId) => {
      const newList = [...list];
      const firstItem = newList.find((i) => i.id === firstItemId);
      const secondItem = newList.find((i) => i.id === secondItemId);
      const firstIndex = firstItem.index;
      firstItem.index = secondItem.index;
      secondItem.index = firstIndex;
      setList(newList);
    },
    [list]
  );

  return (
    <Grid>
      {list
        .sort((a, b) => a.index - b.index)
        .map((e) => (
          <DraggableGridItem key={e.id} currentItem={e} onDrop={onDrop} />
        ))}
    </Grid>
  );
};

export default Notes;
