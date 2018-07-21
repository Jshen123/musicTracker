import React, {Component} from 'react';
import { hydrate } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import App from './App.js';

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
      light: '#757575',
      main: '#a4a4a4',
      dark: '#494949',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#263238',
      main: '#a4a4a4',
      dark: '#494949',
      contrastText: '#ffffff',
    },
    // accent: red,
    // type: 'light',
  },
});

hydrate(
  <MuiThemeProvider theme={theme}>
    <Main />
  </MuiThemeProvider>,
  document.querySelector('#root'),
);
