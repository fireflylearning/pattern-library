'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

var ContainerControlBar = require('./ff_container-control-bar'),
ContainerControlBarSet = ContainerControlBar.ControlBarSet;

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        var root = document.querySelector('[data-ff_container-control-bar]'); //Use jquery or sim in Firefly for backwards compat
        if (root) {
            var element = <ContainerControlBar modifier="split" classes="ff_other-class">
                            <ContainerControlBarSet title="Test title">
                                <span className="crate_util-block" key="item1">Item 1</span>
                                <span className="crate_util-block" key="item2">Item 2</span>
                            </ContainerControlBarSet>
                            <ContainerControlBarSet>
                                <span className="crate_util-block" key="item3">Item 3</span>
                            </ContainerControlBarSet>
                        </ContainerControlBar>;

            ReactDOM.render(element, root);
        }
    });
};
