import React from 'react';
import './App.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1 class="text"> I am a ...</h1>
          <Link to="/visitor"><button class="button" >Visitor</button></Link>
          <Link to="/host"><button class="button" >Host</button></Link>
       
    </div>
  );
}

export default App;
