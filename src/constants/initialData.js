import { randomId } from '../utils/helpers';

export const initialNotes = [
  {
    id: randomId(),
    index: 0,
    title: 'Welcome! 😁',
    text:
      "This keep clone was built with React and uses Firebase as it's database",
    labels: ['react', 'keepclone', 'firebase'],
    backgroundColor: 'default',
    archived: false,
    trashed: false
  },
  {
    id: randomId(),
    index: 1,
    title: '🤏 Drag and drop',
    text: 'Pick up a note and drag it around',
    labels: [],
    backgroundColor: 'default',
    archived: false,
    trashed: false
  },
  {
    id: randomId(),
    index: 2,
    title: 'Create a label',
    text: 'Labels are a great way to group your notes!',
    labels: ['keepclone', 'firebase'],
    backgroundColor: 'default',
    archived: false,
    trashed: false
  },
  {
    id: randomId(),
    index: 3,
    title: 'Change the background color',
    text: '',
    labels: ['firebase'],
    backgroundColor: 'default',
    archived: false,
    trashed: false
  },
  {
    id: randomId(),
    index: 4,
    title: 'Really long note!',
    text: `this
      note
      is
      across
      multiple
      lines
      and
      rows!
    `,
    labels: ['react'],
    backgroundColor: 'default',
    archived: false,
    trashed: false
  }
];

export const initialLabels = [
  {
    id: randomId(),
    label: 'keepclone'
  },
  {
    id: randomId(),
    label: 'react'
  },
  {
    id: randomId(),
    label: 'firebase'
  }
];
