import React from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Visitor } from './Visitor/Visitor.js';
import { Host } from './Host/Host.js';

function App() {
  return (
    <div className="App">
      <div class="split left">
        <div class="centered">
          <h2><Link to="/visitor">Visitor</Link></h2>
          <p>Some text.</p>
        </div>
      </div>
      <div class="split right">
        <div class="centered">
          <h2><Link to="/host">Host</Link></h2>
          <p>Some text.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
