var React = require('react');
require('./utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;
var _ = require('lodash');

var ItemRepeater = require('../blocks/core/ff_container/ff_container-item-repeater/ff_container-item-repeater');

var className = 'ff_container-item-repeater__item';
var data = [{ key: 'item1', text: 'Item 1' }, { key: 'item2', text: 'Item 2' }, { key: 'item3', text: 'Item 3' }];
var modifiers = ['rounded', 'square', 'separated'];
var expectedClasses = modifiers.map(function(modifier) {
    return className + ' ' + className + '--' + modifier;
});

describe('ItemRepeater', function() {
    var component;

    before(function() {
        var element = React.createElement(ItemRepeater, {}, data.map(function(datum) {
            return React.createElement('p', { key: datum.key, style: { margin: 0 } }, datum.text);
        }));
        component = TestUtils.renderIntoDocument(element);
    });

    it('should render', function() {
        expect(component).to.exist;
    });

    it('should have ' + data.length + ' items', function() {
        var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
        expect(items.length).to.equal(data.length);
    });

    modifiers.forEach(function(modifier, i) {
        it('should generate correct class for modifier \'' + modifier + '\'', function() {
            var element = React.createElement(ItemRepeater, { modifier: modifier }, data.map(function(datum) {
                return React.createElement('p', { key: datum.key, style: { margin: 0 } }, datum.text);
            }));
            var component = TestUtils.renderIntoDocument(element);
            var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');
            var allMatch = _.every(items, function(item) {
                return item.className === expectedClasses[i];
            });
            expect(allMatch).to.be.true;
        })
    });
});
