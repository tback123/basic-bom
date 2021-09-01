import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Body from './components/Body';
import { Box } from '@material-ui/core';
import 'axios';
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
      <Box component="span" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Navbar />
        <Body />
      </Box>
    </ThemeProvider>

  );
}

export default App;
