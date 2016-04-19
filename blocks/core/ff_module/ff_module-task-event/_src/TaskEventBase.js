'use strict';

var React = require('react');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;
var DropDownButton = require('../../../ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component');

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: function(){
        return  <div className={this.generateClass('ff_module-task-event', this.props)}>
                    <time className="ff_module-task-event__sent">{this.formatDate(this.props.event.sent)}</time>
                    {this.renderActions(this.props)}
                    {this.props.children}
                </div>
    },
    formatDate: function(date) {
        var validDate = ensureIsDate(date);
        if (validDate) {
            return dateFormatting.niceDate(date);
        }
        return '';
    },
    generateClass: function(base, props) {
        var classNames = [];
        classNames.push(base);
        var event = props.event || {};

        if (event.type) classNames.push(base + '--' + event.type);
        if (event.pending) classNames.push(base + '--is-pending');
        if (event.error) classNames.push(base + '--has-error');
        if (event.deleted) classNames.push(base + '--is-deleted');
        if (event.unreleased) classNames.push(base + '--is-unreleased');
        if (event.released) classNames.push(base + '--is-released');
        return classNames.join(' ');
    },
    renderActions: function(props) {

        var list = props.actions;

        if (list && list.length) {
            return <DropDownButton text="..." list={list} modifier="link-right" icon="response-edit" hideText={true} hideArrow={true} classes="ff_module-task-event__actions"/>
        }

        return null;
    }
});
