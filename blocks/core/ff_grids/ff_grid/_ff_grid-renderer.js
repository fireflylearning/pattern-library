'use strict';

// var React = require('react'),
    // ReactDOM = require('react-dom');

import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './ff_grid';

function TestComponent(props) {
    return <p><span className="crate_util-block">Test Component {props.name}</span></p> 
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_grid]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var grid = <Grid modifier="2-1">
                    <TestComponent name="A" /> 
                    <TestComponent name="B" /> 
                </Grid>
            ReactDOM.render(grid, el);
        }
    });
};
