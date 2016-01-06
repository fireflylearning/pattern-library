'use strict';

var _ = require('underscore');

var newGroup = {
    label: 'New Magic Group',
    'guid': '101',
    type: 'groupprofile',
    'pic_href': '/images/group-icon.png'
};

module.exports = function() {
    var timer;

    return {
        createNewGroup: function(groupData, callback) {
            timer = setTimeout(function() {
                callback(newGroup);
            }, 500);
        }
    };
};
