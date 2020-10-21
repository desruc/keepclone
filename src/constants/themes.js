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

export const lightTheme = createMuiTheme({ overrides, shape });

export const darkTheme = createMuiTheme({
  overrides,
  palette: {
    type: 'dark'
  },
  shape
});
