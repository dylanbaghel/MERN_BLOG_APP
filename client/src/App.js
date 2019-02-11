import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppRouter from './router/AppRouter';

class App extends Component {
  render() {
    return (
      <AppRouter />
    );
  }
}

export default App;
