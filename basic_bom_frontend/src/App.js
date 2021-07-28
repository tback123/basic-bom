import React from 'react';
import './App.css';
import Navbar from './components/NavBar';
import ComponentList from './components/ComponentList';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { yellow, red } from '@material-ui/core/colors';

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
      <ComponentList />
    </ThemeProvider>

  );
}

export default App;
