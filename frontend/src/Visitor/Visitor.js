import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { CheckIn } from './CheckIn.js';
import { CheckOut } from './Checkout.js';

export class Visitor extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div class="col-md-6">
                    <CheckIn/>
                </div>
                <div class="col-md-6">
                    <CheckOut/>
                </div>
            </React.Fragment>
        );
    }
}