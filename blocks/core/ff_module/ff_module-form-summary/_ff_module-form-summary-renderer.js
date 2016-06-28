'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var FormSummary = require('./ff_module-form-summary.js'),
    selector = 'data-ff_module-form-summary';

var props = {
    title: 'Task Summary',
    list: [
        { title: 'Title 1', content: 'Item 1' },
        { title: 'Title 2', content: 'Item 2', url: '#' },
        { title: 'Title 2', content: <p>Item 2</p> }
    ]
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
