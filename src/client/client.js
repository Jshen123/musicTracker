import React, {Component} from 'react';
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App.js';
import {BrowserRouter} from 'react-router-dom'


class Main extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App />;
  }
}

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a4a4a4',
      main: '#757575',
      dark: '#494949',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#263238',
      main: '#a4a4a4',
      dark: '#494949',
      contrastText: '#ffffff',
    },
    background: {
      paper: '#E1E2E1',
      default: '#E1E2E1',
    },
  },
});

hydrate(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Main />
    </MuiThemeProvider>
  </BrowserRouter>,
  document.querySelector('#root'),
);
