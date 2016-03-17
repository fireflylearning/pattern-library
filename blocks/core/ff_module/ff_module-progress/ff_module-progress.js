'use strict';

let React = require('react');
let ProgressTemplate = require('./_src/_ff-module-progress-template.jsx');

module.exports = React.createClass({
  displayName: 'Progress',
  render: function() {
    return React.createElement(ProgressTemplate, this.props);
  }
});
