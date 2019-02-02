import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './pages/Home';

const theme = createMuiTheme({
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={Home} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
