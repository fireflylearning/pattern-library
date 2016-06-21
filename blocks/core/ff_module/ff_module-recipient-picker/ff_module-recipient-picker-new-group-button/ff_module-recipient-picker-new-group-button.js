'use strict';

var React = require('react');

module.exports = function(recipientPicker, groupsService) {
    if (!recipientPicker) throw new Error('[new-group-button] requires a \'picker\' reference');
    if (!groupsService) throw new Error('[new-group-button] requires a \'groupsService\' parameter');

    return React.createClass({
        displayName: 'NewGroupButton',
        render: function(){
            return (
                <button
                    type="button"
                    title="Create new group from list"
                    className="ff_module-button ff_module-button--large ff_module-button-new-recipient-group"
                    onClick = {this.onClick}
                    >
                    <span className="ff_module-button__content">Create new group from list</span>
                </button>
            );
        },
        onClick: function(e) {
            groupsService.createNewGroup(recipientPicker.getSelectedRecipients(), function(results) {
                recipientPicker.setSelected(results);
            });
        }
    });
};
