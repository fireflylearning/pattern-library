'use strict';

var React = require('react'),
    ContainerFormLine = require('../../../ff_container/ff_container-form-line/ff_container-form-line');

module.exports = React.createClass({
    displayName: 'TaskTitle',
    render: function(){
        return (
            <ContainerFormLine> 
                <label modifier="stacked" htmlFor="task_title">Task Title</label>
                <input modifier="" id="task_title" type="text"></input>
            </ContainerFormLine>
        );
    },
    onChange: function() {
        console.log('changed')
    }
});
