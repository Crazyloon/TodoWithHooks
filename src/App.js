import './App.scss';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { store } from './store'
import { history } from "./store/history";
import { Redirect } from 'react-router';

import logo from './logo.svg';

import HelloWorld from './components/helloworld/helloworld';
import { ConnectedNavigation } from "./components/navigation/navigation";
import { ConnectedTaskDetail } from './components/taskdetail/taskdetail';
import { ConnectedDashboard } from './components/dashboard/dashboard';
import { ConnectedLogin } from './components/login/login';


const RouteGuard = Component => ({ match }) => {
  console.info('route guard', match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/login" />
  } else {
    return <Component match={match} />
  }

}
function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App">
          <ConnectedNavigation />
          <Route exact path="/" component={HelloWorld} />
          <Route exact path="/login" component={ConnectedLogin} />
          <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
          <Route exact path="/task/:id" render={RouteGuard(ConnectedTaskDetail)} />
          <header className="App-header">
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
      </Router>
    </Provider>
  );
}

export default App;
