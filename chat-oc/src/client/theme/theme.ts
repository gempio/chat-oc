import { ThemeOptions } from '@mui/material/styles';
export { rezlynxTheme } from './rezlynxTheme';

export const localTheme: ThemeOptions = {
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input[type=text]': {
            boxSizing: 'content-box',
            border: 'none'
          },
          '& fieldset': {
            background: 'transparent'
          }
        }
      }
    }
  }
};
