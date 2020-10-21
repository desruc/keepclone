export const getBackgroundColors = (theme) => {
  const isDarkMode = theme.palette.type === 'dark';

  return [
    {
      key: 'default',
      title: 'Default',
      color: theme.palette.background.default
    },
    {
      key: 'red',
      title: 'Red',
      color: isDarkMode ? '#5c2b29' : '#f28b82'
    },
    {
      key: 'light-brown',
      title: 'Light Brown',
      color: isDarkMode ? '#614a19' : '#fbbc04'
    },
    {
      key: 'yellow',
      title: 'Yellow',
      color: isDarkMode ? '#635d19' : '#fff475'
    },
    {
      key: 'green',
      title: 'Green',
      color: isDarkMode ? '#345920' : '#ccff90'
    },
    {
      key: 'aqua',
      title: 'Aqua',
      color: isDarkMode ? '#16504b' : '#a7ffeb'
    },
    {
      key: 'light-blue',
      title: 'Light Blue',
      color: isDarkMode ? '#2d555e' : '#cbf0f8'
    },
    {
      key: 'blue',
      title: 'Blue',
      color: isDarkMode ? '#1e3a5f' : '#aecbfa'
    },
    {
      key: 'purple',
      title: 'Purple',
      color: isDarkMode ? '#42275e' : '#d7aefb'
    },
    {
      key: 'pink',
      title: 'Pink',
      color: isDarkMode ? '#5b2245' : '#fdcfe8'
    },
    {
      key: 'brown',
      title: 'Brown',
      color: isDarkMode ? '#442f19' : '#e6c9a8'
    },
    {
      key: 'grey',
      title: 'Grey',
      color: isDarkMode ? '#3c3f43' : '#e8eaed'
    }
  ];
};

export const backgroundColorStyles = (theme) => {
  const styles = {};
  getBackgroundColors(theme).forEach((c) => {
    styles[c.key] = {
      backgroundColor: c.color
    };
  });
  return styles;
};

export default backgroundColorStyles;
