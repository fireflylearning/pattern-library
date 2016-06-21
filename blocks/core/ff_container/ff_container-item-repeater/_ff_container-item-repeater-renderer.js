'use strict';

var React = require('react'),
    ReactDOM = require('react-dom');

var ItemRepeater = require('./ff_container-item-repeater');
var data = [{key:'item1', text: 'Item 1'}, {key:'item2', text: 'Item 2'}, {key:'item3', text: 'Item 3'}];

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-item-repeater]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var repeater = React.createElement(ItemRepeater, { modifier: 'separated' }, data.map(function(datum, index) {
                return React.createElement('p', { key: datum.key, style: { margin: 0 } }, datum.text);
            }));

            ReactDOM.render(repeater, el);
        }
    });
};
