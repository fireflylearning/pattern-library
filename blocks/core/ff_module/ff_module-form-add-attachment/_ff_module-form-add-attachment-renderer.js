'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var FormAddAttachment = require('./ff_module-form-add-attachment');

var props = {
    fileSources: [
        { text: 'From computer', onClick: function() { console.log('computer'); } },
        { text: 'From existing file', onClick: function() { console.log('file'); } },
        { text: 'From Google Drive', onClick: function() { console.log('google-drive'); } },
        { text: 'From OneDrive', onClick: function() { console.log('one-drive'); } }
    ],
    onFileDrop: function(event){
        console.log(event.dataTransfer.files);
    },
    files:[{name:'resource696.jpeg', type:'image/jpeg'}]
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var element = document.querySelector('[data-ff_module-form-add-attachment]');
        if (element) {
            ReactDOM.render(React.createElement(FormAddAttachment, props), element);
        }
    });
};
