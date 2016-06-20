'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var FormSummary = require('./ff_module-form-summary.js'),
    selector = 'data-ff_module-form-summary';

var props = {
    title: 'Task Summary',
    items : [ {title: 'Title 1', data: 'Item 1'}, {title: 'Title 2', data: 'Item 2', url:'#'}]
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            if (domElement) {
                ReactDOM.render(<FormSummary {...props}>
                        <span className='crate_util-block'>Module A</span>
                    </FormSummary>, domElement);
            }
        });
    });
};
