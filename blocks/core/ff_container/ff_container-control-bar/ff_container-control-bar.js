'use strict';

var React = require('react');

var ControlBarSet = require('./_src/ControlBarSet');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;


module.exports = React.createClass({
    displayName: 'ContainerControlBar',
    render: function() {
        return (
            <div className={generateClass('ff_container-control-bar', this.props)}>
                {this.props.sets ? this.props.sets.map((set, setIndex) =>
                    <ControlBarSet
                        title={set.title}
                        key={set.key || setIndex}>{set.modules}</ControlBarSet>) : null}
                {this.props.children}
            </div>
        );
    }
});

module.exports.ControlBarSet = ControlBarSet;
