var React = require('react');
require('./utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var event = { type: 'set-task', sent: '20:40', author: { name: 'Sally Student' }, taskTitle: 'Write an Essay' };

describe('TaskEvent', function() {
    var component;

    before(function() {
        // var element = React.createElement(ItemRepeater, {}, data.map(function(datum) {
        //     return React.createElement('p', { key: datum.key, style: { margin: 0 } }, datum.text);
        // }));
        // component = TestUtils.renderIntoDocument(element);
    });

    it('should render');

    _.each(event, function(prop, key, event) {
        it('should have value of \'' + prop + '\' for prop \'' + key + '\'');
    });
});
