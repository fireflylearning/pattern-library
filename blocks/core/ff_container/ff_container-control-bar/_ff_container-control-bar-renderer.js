'use strict';
var React = require('react');

var ContainerControlBar = require('./ff_container-control-bar');
var sets = [{
    title: 'Test title',
    modules: [
        { key: 'item1', text: 'Item 1' },
        { key: 'item2', text: 'Item 2' }
    ]
}, {
    modules: [{ key: 'item3', text: 'Item 3' }]
}];


module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var root = document.querySelector('[data-ff_container-control-bar]'); //Use jquery or sim in Firefly for backwards compat
        if (root) {
            var element = React.createElement(ContainerControlBar,
            {
                modifier: 'split',
                classes: 'ff_other-class',
                sets: sets.map(function(datum) {
                    datum.modules = datum.modules.map(function(module){
                        return React.createElement('span',
                            { className:'crate_util-block', key: module.key },
                            module.text);
                    });
                    return datum;
                })
            });
            React.render(element, root);
        }
    });
};
