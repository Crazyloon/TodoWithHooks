import './App.scss';
import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { store } from './store'
import { history } from "./store/history";

import logo from './logo.svg';
import HelloWorld from './components/helloworld/helloworld';
import { ConnectedNavigation } from "./components/navigation/navigation";
import { ConnectedTaskDetail } from './components/taskdetail/taskdetail';
import { ConnectedDashboard } from './components/dashboard/dashboard';

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <ConnectedNavigation/>
          <Route exact path="/dashboard" render={() => (<ConnectedDashboard />)} />
          <Route exact path="/task/:id" render={({match}) => (<ConnectedTaskDetail match={match} />)} />
          <header className="App-header">
            <HelloWorld />
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
