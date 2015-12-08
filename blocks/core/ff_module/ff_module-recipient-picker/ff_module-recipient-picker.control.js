'use strict';

var $ = require('jquery');

var dummySet = [{
    label: 'Sally Student',
    'guid': '122',
    'pic_href': '/images/default_picture.png'
}, {
    label: 'Sarah Student',
    'guid': '123',
    'pic_href': '/images/default_picture.png'
}, {
    label: 'Samantha Student',
    'guid': '124',
    'pic_href': '/images/default_picture.png'
}];

module.exports = function() {
    var timer;

    return {
        getSearchResults: function(query, allowusers, allowgroups, site_id, returnfn) {
            if (timer) clearTimeout(timer);

            timer = setTimeout(function() {
                returnfn(dummySet);
            }, 500);
        },
        getInitialResults: function() {
            return [];
        }
    };
};
