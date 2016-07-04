'use strict';

var React = require('react'),
    ContainerFormLine =      require('../../../ff_container/ff_container-form-line/ff_container-form-line'),
    ModuleDatePickerJumpto = require('../../../ff_module/ff_module-date-picker-jumpto/ff_module-date-picker-jumpto');

// console.log(ModuleDatePickerJumpto);

module.exports = React.createClass({
    displayName: 'DueDate',
    render: function(){
        return (
            <ContainerFormLine> 
                <label modifier="stacked" htmlFor="due_date">Due Date</label>
                <input id="due_date" type="text"></input>
            </ContainerFormLine>
        );
    }
});