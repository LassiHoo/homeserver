import React from 'react';
import './App.css';
import MQTTtest from './components/MQttclient'
import './index.css';

const testdata = [
  ["time", "Temperature"],
  [1, 12],
  [2, 33],
  [3, 3],
  [4, 20],
  [5, 18],
  [6, 14]
];

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <MQTTtest/>
      </header>
    </div>
  );
}

export default App;
