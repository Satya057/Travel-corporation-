import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import GroupList from './components/GroupList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>Todo Group Status</h1>
        <GroupList />
      </div>
    </Provider>
  );
}

export default App;
