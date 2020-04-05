import React from 'react';
import { Provider } from 'react-redux';
import logo from './logo.svg';
import './App.scss';
import { store } from './store'
import HelloWorld from './components/helloworld/helloworld';
import { ConnectedDashboard } from './components/dashboard/dashboard';

function App() {
  console.log(store.getState());
  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedDashboard/>
        <HelloWorld/>
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
    </Provider>
  );
}

export default App;
