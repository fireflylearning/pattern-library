'use strict';

var React = require('react');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: function(){
        return  <div className={this.generateClass('ff_module-task-event', this.props.event)}>
                    <time className="ff_module-task-event__sent">{this.formatDate(this.props.event.sent)}</time>
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
    generateClass: function(base, event) {
        var classNames = [];
        classNames.push(base);
        if (event.type) classNames.push(base + '--' + event.type);
        if (event.pending) classNames.push(base + '--is-pending');
        if (event.error) classNames.push(base + '--has-error');
        if (event.deleted) classNames.push(base + '--was-deleted');
        if (event.unreleased) classNames.push(base + '-is-unreleased');
        return classNames.join(' ');
    }
});
