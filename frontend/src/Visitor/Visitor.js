import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { CheckIn } from './CheckIn.js';
import { CheckOut } from './Checkout.js';

export class Visitor extends React.Component {
    render() {
        return (
            <div class="visitor">
                <h6><Link to="/">Back to Main Page</Link></h6>
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
}