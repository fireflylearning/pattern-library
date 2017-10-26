'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    IconSVG = require('./ff_icon-svg').default;

var props = {
  name: 'page-down-open',
  base: '/icons/sprites.svg#ff_icon-',
  modifier: 'large',
  classes: 'external-class',
  data: [
    {
      attr: 'data-attr-1',
      value: 'value-1'
    }
  ]
}

module.exports = function() {
  document.addEventListener('DOMContentLoaded', function(event) {
		var element = document.querySelector('[data-ff_icon-svg]');
		if (element) {
			ReactDOM.render(<IconSVG {...props} />, element);
		}
	});
};
