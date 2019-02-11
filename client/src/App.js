import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AppRouter from './router/AppRouter';
import OfflinePage from './components/Offline';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Online>
          <AppRouter />
        </Online>
        <Offline>
          <OfflinePage />
        </Offline>
      </React.Fragment>
    );
  }
}

export default App;
