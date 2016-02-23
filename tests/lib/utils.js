'use strict';

var React = require('react');
var jsdom = require('jsdom');

function propagateToGlobal(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && !(key in global)) {
            global[key] = obj[key];
        }
    }
}

function bootstrapBrowser() {
    var document = jsdom.jsdom("<!doctype html><html><body></body></html>");
    var window = document.defaultView;
    global.document = document;
    global.window = window;

    propagateToGlobal(window);
}

// Workaround for Stateless Components as they don't yet work with TestUtils
function wrap(statelessComponent) {
    return React.createClass({
        displayName: statelessComponent.name,
        render: function() {
            return statelessComponent(this.props);
        }
    });
}


exports.wrap = wrap;

exports.bootstrapBrowser = bootstrapBrowser;
