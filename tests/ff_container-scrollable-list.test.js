var React = require('react');
require('./utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var ScrollableList = require('../blocks/core/ff_container/ff_container-scrollable-list/ff_container-scrollable-list');
var main = React.createElement('div', { style: { margin: 0 } }, 'Main div');
var sidebar = React.createElement('div', { style: { margin: 0 } }, 'Sidebar div');

describe('ScrollableList', function() {
    var component;

    before(function() {
        var element = React.createElement(ScrollableList, {
            main: main,
            sidebar: sidebar
        });
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    // it('should have ' + data.length + ' items', function() {
    //     var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
    //     expect(items.length).to.equal(data.length);
    // });

    // modifiers.forEach(function(modifier, i) {
    //     it('should generate correct class for modifier \'' + modifier + '\'', function() {
    //         var element = React.createElement(ItemRepeater, { modifier: modifier }, data.map(function(datum) {
    //             return React.createElement('p', { key: datum.key, style: { margin: 0 } }, datum.text);
    //         }));
    //         var component = TestUtils.renderIntoDocument(element);
    //         var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
    //         var allMatch = _.every(items, function(item) {
    //             return item.className === expectedClasses[i];
    //         });
    //         expect(allMatch).to.be.true;
    //     })
    // });
});
