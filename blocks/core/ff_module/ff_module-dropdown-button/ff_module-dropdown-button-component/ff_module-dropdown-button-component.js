'use strict';

var React = require('react');
var DropdownMainTemplate = require('./_src/templates/main.jsx').default;
var activateDropdowns = require('../ff_module-dropdown-button');
var _ = require('lodash');

module.exports = React.createClass({
    displayName: 'DropdownButton',
    propTypes: {
        list: React.PropTypes.array.isRequired,
        text: React.PropTypes.string.isRequired,
        isDisabled: React.PropTypes.bool
    },
    render: function(){
        return <DropdownMainTemplate {...this.props} generateClass={this.generateClass} dropdownLinkId={this.getDataAttrId()}/>;
    },
    componentWillMount: function() {
        this.localId = _.uniqueId('dd-');
    },
    componentDidMount: function() {
        activateDropdowns({
            root: this._root,
            triggerSelBase: 'data-ff_module-dropdown-button-rt-trigger',
            targetSelBase: 'data-ff_module-dropdown-button-rt-target'
        });
    },
    bindRef: function(component){
        this._root = component;
    },
    generateClass: function(base) {
        var classNames = [],
            props = this.props;
        classNames.push(base);
        if (!!props.modifier) classNames.push(base + '--' + props.modifier);
        if (!!props.isOpen) classNames.push(base + '--is-open');
        if (!!props.isDisabled) classNames.push(base + '--is-disabled');
        if (!!props.classes) classNames.push(props.classes);
        return classNames.join(' ');
    },
    getDataAttrId: function() {
        return this.localId;
    }
});
