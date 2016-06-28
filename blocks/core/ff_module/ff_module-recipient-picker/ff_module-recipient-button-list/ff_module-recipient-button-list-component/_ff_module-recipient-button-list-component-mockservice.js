'use strict';

var groups = {
    'your-sets': [{
        label: 'Christine Collie',
        'guid': '130',
        type: 'profile',
        'pic_href': '/images/default_picture.png'
    }, {
        label: 'Sam Fulton',
        'guid': '129',
        type: 'profile',
        'pic_href': '/images/default_picture.png'
    }],
    'your-groups': [{
        label: 'Group CX/7',
        'guid': '125',
        type: 'groupprofile',
        'pic_href': '/images/group-icon.png'
    }, {
        label: 'Group DX/7',
        'guid': '126',
        type: 'groupprofile',
        'pic_href': '/images/group-icon.png'
    }],
    'all-groups': [{
        label: 'Fred Flintstone',
        'guid': '128',
        type: 'profile',
        'pic_href': '/images/default_picture.png'
    }, {
        label: 'Sam Fulton',
        'guid': '129',
        type: 'profile',
        'pic_href': '/images/default_picture.png'
    }, {
        label: 'Group CX/7',
        'guid': '125',
        type: 'groupprofile',
        'pic_href': '/images/group-icon.png'
    }, {
        label: 'Group DX/7',
        'guid': '126',
        type: 'groupprofile',
        'pic_href': '/images/group-icon.png'
    }]
};

module.exports = function() {
    var timer;
    return {
        getGroupsOfType: function(groupTypeId, callback) {
            var results = groups[groupTypeId];

            timer = setTimeout(function() {
                if (!results) return callback(null);
                callback(results);
            }, 500);
        }
    };
};

module.exports.groups = groups;

