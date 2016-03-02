'use strict';

var React = require('react');
var template = require('./_ff_module-incremental-navigation.rt.js');

module.exports = React.createClass({
    displayName: 'IncrementalNavigation',
    propTypes: {
        nextText: React.PropTypes.string.isRequired,
        previousText: React.PropTypes.string.isRequired,
        isFirst: React.PropTypes.bool,
        isLast: React.PropTypes.bool,
        onNext: React.PropTypes.func.isRequired,
        onPrevious: React.PropTypes.func.isRequired
    },
    render: template
});
