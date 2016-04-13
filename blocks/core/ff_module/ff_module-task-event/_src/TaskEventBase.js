'use strict';

var React = require('react');
var dateFormatting = require('../../../_lib/_ui/dateFormatting')();
var ensureIsDate = require('../../../_lib/_ui/date-utils').ensureIsDate;

module.exports = React.createClass({
    displayName: 'TaskEventBase',
    render: function(){
        return  <div className={this.generateClass('ff_module-task-event', this.props.event)}>
                    <time className="ff_module-task-event__sent">
                        {this.formatDate(this.props.event.sent)}
                    </time>
                    <DropdownButton>
                        id="event-actions"
                        key="event-actions"
                        modifier="compact-right-widelist"
                        text="..."
                        list="{[
                            {
                                text: 'Delete',
                                key: events.types.delete,
                                onClick: this.props.event.onDelete
                            }, {
                                text: 'Edit',
                                key: events.types.edit,
                                onClick: this.props.event.onEdit
                            }
                        ]}"
                    </DropdownButton>
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
        if (event.deleted) classNames.push(base + '--is-deleted');
        if (event.unreleased) classNames.push(base + '--is-unreleased');
        if (event.released) classNames.push(base + '--is-released');
        return classNames.join(' ');
    }
});
