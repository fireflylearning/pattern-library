'use strict';

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
        }
    };
};
