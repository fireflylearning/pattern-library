'use strict';
var React = require('react');

let Progress = require('../../ff_module/ff_module-progress/ff_module-progress.js'),
    selector = 'data-ff_module-progress'

var data = {
  id0: {
    id: 1,
    classes: "ff_module-other-module-class ff_utils-other-class",
    sent_to: 23,
    no_excused: 2 ,
    completed_by: 20 ,
    marked: 3
  },
  id1: {
    id: 2,
    sent_to: 23,
    no_excused: 2 ,
    completed_by: 20 ,
    marked: 0
  },
  id2: {
    id: 3,
    sent_to: 23,
    no_excused: 2 ,
    completed_by: 0 ,
    marked: 0
  }
}

module.exports = function() {
    document.addEventListener('DOMContentLoaded', function(event) {
        Array.prototype.forEach.call(document.querySelectorAll('[' + selector + ']'), function(domElement) {
            var id = domElement.getAttribute(selector);
            var element = React.createElement(Progress, data[id]);
            React.render(element, domElement);
        });
    });
};
