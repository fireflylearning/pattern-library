'use strict';

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

exports.bootstrapBrowser = bootstrapBrowser;
