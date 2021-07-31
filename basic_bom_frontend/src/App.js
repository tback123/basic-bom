import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Body from './components/Body';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fed403',
    },
    secondary: {
      main: '#90caf9',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Body />
    </ThemeProvider>

  );
}

export default App;
