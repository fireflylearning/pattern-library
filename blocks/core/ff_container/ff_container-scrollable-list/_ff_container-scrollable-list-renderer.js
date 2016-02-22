'use strict';
var React = require('react');

var ScrollableList = require('./ff_container-scrollable-list');
var data = [{ key: 'item1', text: 'Item 1' }, { key: 'item2', text: 'Item 2' }, { key: 'item3', text: 'Item 3' }];

var main = React.createElement('pre', { style: { margin: 0 } }, 'Main div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div');
var sidebar = React.createElement('pre', { style: { margin: 0 } }, 'Sidebar div\n Sidebar div\n  Main div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div \nMain div');

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var el = document.querySelector('[data-ff_container-scrollable-list]'); //Use jquery or sim in Firefly for backwards compat
        if (el) {
            var element = React.createElement(ScrollableList, {
                main: main,
                sidebar: sidebar
            });
            React.render(element, el);
        }
    });
};
