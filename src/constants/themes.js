import { createMuiTheme } from '@material-ui/core/styles';

const overrides = {
  MuiButton: {
    root: {
      textTransform: 'none'
    }
  }
};

const shape = {
  borderRadius: 8
};

export const lightTheme = createMuiTheme({
  overrides,
  shape,
  palette: {
    warning: {
      main: 'rgb(254, 239, 195)'
    }
  }
});

export const darkTheme = createMuiTheme({
  overrides,
  palette: {
    type: 'dark',
    warning: {
      main: '#41331c'
    }
  },
  shape
});
