'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ModuleFileList = require('./ff_module-file-list');

var props = {
    classes: 'ff_whatever',
    files: [{
        title: 'My lovely file.pdf',
        href: '#'
    }, {
        type: 'page',
        title: 'My lovely page',
        href: '#'
    }]
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(evnt) {

        Array.prototype.forEach.call(document.querySelectorAll('[data-ff_module-file-list]'), function(domElement, index) {
            var root =  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            <li key={'ul-li'+index} style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: '5px' }}>
                                <ModuleFileList {...props}></ModuleFileList>
                            </li>
                        </ul>;
            ReactDOM.render(root, domElement);
        });


    });
};
