'use strict';
var React = require('react');

module.exports = function(picker, groupsService, template) {
    if (!picker) throw new Error('[new-group-button] requires a \'picker\' reference');
    if (!groupsService) throw new Error('[new-group-button] requires a \'groupsService\' parameter');

    console.log(groupsService);

    return React.createClass({
        render: template,

        onClick: function(e) {
            groupsService.sendNewGroup(picker.getSelectedRecipients(), function(results) {
                picker.setSelected(results);
            });
        }
    });

};
