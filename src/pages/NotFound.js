import React from 'react';

import NoNotes from '../components/NoNotes';

const NotFound = () => {
  return (
    <main>
      <NoNotes
        icon="notFound"
        message="Whatever you're looking for, it's not here..."
      />
    </main>
  );
};

export default NotFound;
