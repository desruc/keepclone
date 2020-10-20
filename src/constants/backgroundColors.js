export  const backgroundColors = [
  {
    key: 'default',
    title: 'Default',
    color: 'transparent'
  },
  {
    key: 'red',
    title: 'Red',
    color: '#5c2b29'
  },
  {
    key: 'light-brown',
    title: 'Light Brown',
    color: '#614a19'
  },
  {
    key: 'yellow',
    title: 'Yellow',
    color: '#635d19'
  },
  {
    key: 'green',
    title: 'Green',
    color: '#345920'
  },
  {
    key: 'aqua',
    title: 'Aqua',
    color: '#16504b'
  },
  {
    key: 'light-blue',
    title: 'Light Blue',
    color: '#2d555e'
  },
  {
    key: 'blue',
    title: 'Blue',
    color: '#1e3a5f'
  },
  {
    key: 'purple',
    title: 'Purple',
    color: '#42275e'
  },
  {
    key: 'pink',
    title: 'Pink',
    color: '#5b2245'
  },
  {
    key: 'brown',
    title: 'Brown',
    color: '#442f19'
  },
  {
    key: 'grey',
    title: 'Grey',
    color: '#3c3f43'
  }
];

export const backgroundColorStyles = () => {
  const styles = {};
  backgroundColors.forEach((c) => {
    styles[c.key] = {
      backgroundColor: c.color
    };
  });
  return styles;
};

export default backgroundColorStyles;
