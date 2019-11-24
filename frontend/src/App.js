import React from 'react';
import './App.css';
import { CheckIn } from './checkin/CheckIn.js';
import { CheckOut } from './checkout/Checkout.js';

function App() {
  return (
    <div className="App">
      <div class="container" id='mainPage'>
      <h3>Please provide your Details</h3>
        <div class="row">
          <div class="col-sm">
            <CheckIn/>
          </div>
          <div class="col-sm">
            <CheckOut/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
