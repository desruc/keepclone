import { createMuiTheme } from '@material-ui/core/styles';

const overrides = {
  MuiButton: {
    root: {
      textTransform: 'none'
    }
  }
};

export const lightTheme = createMuiTheme({ overrides });

export const darkTheme = createMuiTheme({
  overrides,
  palette: {
    type: 'dark'
  }
});
