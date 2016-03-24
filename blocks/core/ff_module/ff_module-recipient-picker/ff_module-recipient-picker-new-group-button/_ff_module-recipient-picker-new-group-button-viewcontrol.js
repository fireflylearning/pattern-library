'use strict';
var React = require('react');

module.exports = function(picker, groupsService, template) {
    if (!picker) throw new Error('[new-group-button] requires a \'picker\' reference');
    if (!groupsService) throw new Error('[new-group-button] requires a \'groupsService\' parameter');

    return React.createClass({
        render: template,
        displayName: 'NewGroupButton',
        onClick: function(e) {
            groupsService.createNewGroup(picker.getSelectedRecipients(), function(results) {
                picker.setSelected(results);
            });
        }
    });

};
