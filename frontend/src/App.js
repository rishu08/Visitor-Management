import React from 'react';
import './App.css';
import { Host } from './Host/Host.js';
import { Visitor } from './Visitor/Visitor';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
         

<div class="container register">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <h3>Welcome Visitor</h3>
                    </div>
                    <div class="col-md-9 register-right">
                    <Link to="/host"><button class="button" >Host</button></Link>

                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Register as Visitor</h3>
                                <div class="row register-form">
                                  <Visitor/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </div>
       
    </div>
  );
}

export default App;
