'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerModalWithDialog = require('./ff_container-modal-with-dialog');
var props = {
  isOpen: true,
  modifier: 'fixed-height',
  title: 'Container with Dialog',
  controls: [<button key="send">Send</button>, <button key="close">Close</button>]
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-modal-with-dialog]');
        if (el) {

            ReactDOM.render(<ContainerModalWithDialog {...props}>
                <p>I was going to say something extremely rough to Lorem Ipsum, to its family, and I said to myself, "I can't do it. I just can't do it. It's inappropriate. It's not nice." I write the best placeholder text, and I'm the biggest developer on the web by far... While that's mock-ups and this is politics, are they really so different?</p>
                <input type="text" className="ff_module-form-input"/>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
                <p>We have all the best words</p>
            </ContainerModalWithDialog>, el);
        }
    });
};
