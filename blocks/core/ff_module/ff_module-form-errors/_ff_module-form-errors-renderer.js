'use strict';

var ReactDOM = require('react-dom');

var FormErrors = require('./ff_module-form-errors');
var dataAttr = '[data-ff_module-form-errors]';

var propsList = [{
    modifier: 'fantastic',
    messages: ['Please provide a username']
}, {
    messages: ['Please provide a username', 'Please provide a password', 'Please provide an email address, this is a long message that will wrap onto the next line when it must']
}];


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector(dataAttr);
        if (element) {
            var root = (
                <ul className='crate_blocklist' style={{ width: '40%'}}>
                    {propsList.map((props, index)=>{
                        return <li key={'index'+index}><FormErrors {...props}/></li>;
                    })}
                </ul>
                )
            ReactDOM.render(root, element);
        }
    });
};
