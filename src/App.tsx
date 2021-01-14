import React, { useState } from 'react';
import {
  createMuiTheme,
  CssBaseline,
  Switch,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { NightsStay, WbSunny } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Form from './components/Form';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      alignSelf: 'flex-end',
    },
    track: {
      backgroundColor: '#aeaeae',
    },
    input: {
      padding: '100px',
    },
  }),
);

function App() {
  const [darkState, setDarkState] = useState(
    localStorage.getItem('darkState') === 'true',
  );

  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#ced7db',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#11cb5f',
        dark: '#ba000d',
        contrastText: '#000',
      },
      type: darkState ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkState(!darkState);
    localStorage.setItem('darkState', JSON.stringify(!darkState));
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch
        onChange={handleThemeChange}
        checked={darkState}
        icon={<WbSunny fontSize="small" style={{ fill: '#ffc107' }} />}
        checkedIcon={<NightsStay fontSize="small" />}
        classes={useStyles()}
        edge="end"
        disableRipple
      />
      <Typography variant="h2" component="h1">
        Docker Generator
      </Typography>
      <Form />
    </ThemeProvider>
  );
}

export default App;
