'use strict';
var React = require('react'),
    ReactDOM = require('react-dom'),
    createHeading = require('../../_lib/ff-core/_ff-core.js').createHeading;

var ContainerDialog = require('./ff_container-dialog'),
    selector = 'data-ff-crate-block-react-item';

var props = {
    title: 'Title',
    showCloseIcon: true,
    onCloseIconClick: function(){
        console.log('close');
    },
    body: <p>Rutrum cum arcu cubilia doloremque illo litora, varius egestas, magni tellus, irure nihil. Quisquam praesentium, temporibus montes facilisi, natus, cubilia quas maiores irure interdum? Aliquet tenetur volutpat perspiciatis vel viverra, culpa mauris maxime habitasse, harum. Integer incidunt proident, auctor! Nesciunt incidunt quisquam hendrerit in labore convallis eiusmod, tortor aliquam vestibulum mattis mus inceptos cursus distinctio, quidem ipsum ipsa et illum? Ridiculus, in, molestiae lectus tellus neque ullam montes dolorum maiores. Vero risus doloribus! Habitant inceptos elit malesuada consequatur, consequatur, consequat, vulputate lectus, nostrud imperdiet, minima turpis bibendum sociosqu doloribus natus mauris nihil viverra porttitor. Fugit varius. Ante dolores ornare porro quae praesent commodi, sequi erro</p>,
    controls: [<button key="send">Send</button>, <button key="close">Close</button>],
    modifier: 'fixed-height',
    saveState: '' // try SAVE_IN_PROGRESS or SAVE_SUCCESS
};

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            if (domElement) {
                ReactDOM.render(React.createElement(ContainerDialog, props), domElement);
                createHeading(domElement);
            }
        });
    });
};