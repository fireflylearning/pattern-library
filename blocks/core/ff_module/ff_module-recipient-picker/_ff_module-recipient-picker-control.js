'use strict';
var _ = require('underscore');

var dummyMembers = {
    '125': [{
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
    '126': [{
        label: 'Fred Flintstone',
        'guid': '128',
        type: 'profile',
        'pic_href': '/images/default_picture.png'
    }, {
        label: 'Frank N. Furter',
        'guid': '127',
        type: 'profile',
        'pic_href': '/images/default_picture.png'
    }]
};

var dummySet = [{
    label: 'Sally Student',
    'guid': '122',
    type: 'profile',
    'pic_href': '/images/default_picture.png'
}, {
    label: 'Sarah Student',
    'guid': '123',
    type: 'profile',
    'pic_href': '/images/default_picture.png'
}, {
    label: 'Samantha Student',
    'guid': '124',
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
}];

module.exports = function() {
    var timer;

    return {
        getSearchResults: function(query, returnfn) {
            if (timer) clearTimeout(timer);

            if (!(/\S+/.test(query)) || query === 'noresults') {
                clearTimeout(timer);
                returnfn([]);
                return;
            }

            timer = setTimeout(function() {
                returnfn(dummySet);
            }, 500);
        },
        getInitialResults: function() {
            return [];
        },
        getMembersOfGroup: function(guid) {
            return dummyMembers[guid];
        }
    };
};
