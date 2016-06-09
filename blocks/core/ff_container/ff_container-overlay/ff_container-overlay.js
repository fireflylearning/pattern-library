'use strict';

var React = require('react');
var generateClass = require('../../_lib/_ui/class-utils').generateStandardClass;

module.exports = React.createClass({
    displayName: 'ContainerOverlay',
    render: function(){
        return (
            <div className={generateClass('ff_container-overlay', this.props)} >
                <div className="ff_container-overlay__body">{this.props.body}</div>
                <div className="ff_container-overlay__bar">
                    <div className="ff_container-overlay__bar-content">{this.props.bar}</div>
                </div>
            </div>
        );
    }
});
