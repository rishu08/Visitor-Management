import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="container">
        <h3>Please provide your Details</h3>
        <form>
          <label for="formGroupExampleInput">Full-Name</label>
          <div class="row">
            <div class="col">
              <input type="text" class="form-control" placeholder="First name"/>
            </div>
            <div class="col">
              <input type="text" class="form-control" placeholder="Last name"/>
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput">Mobile-Number</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Enter mobile number"/>
          </div>
          <small id="emailHelp" class="form-text text-muted">We'll never share your details with anyone.</small>
        </form>
      </div>
    </div>
  );
}

export default App;
