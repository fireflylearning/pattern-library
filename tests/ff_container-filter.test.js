'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var FilterContainer = require('../blocks/core/ff_container/ff_container-filter/ff_container-filter');

describe('FilterContainer', function() {
    it('should render a filter container with filters in it', function() {
        var element = React.createElement(FilterContainer, { filters: [] });
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    var filter1 = <span> filter1 </span>,
        filter2 = <span> filter2 </span>;


    var filters = [{
        key: 1,
        content: filter1
    }, {
        key: 2,
        content: filter2
    }];
    it('should render a filter container with ' + filters.length + ' filters', function() {
        var element = React.createElement(FilterContainer, { filters: filters });
        var component = TestUtils.renderIntoDocument(element);

        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-filter');
        var items = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
        expect(items.length).to.equal(filters.length);
    });

    var label = "[Sort by]";
    it('should render a filter container with a label ' + label, function() {
        var element = React.createElement(FilterContainer, { label: label, filters: filters });
        var component = TestUtils.renderIntoDocument(element);

        var labelNode = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-filter__label');
        expect(labelNode.textContent).to.equal(label);
    });

    var modifier = '[Modifier]';
    it('should render a filter container with modifier ' + label, function() {
        var element = React.createElement(FilterContainer, { modifier: modifier, filters: filters });
        var component = TestUtils.renderIntoDocument(element);

        var itemsNode = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-filter__items');
        expect(itemsNode.className).to.equal('ff_container-filter__items ff_container-filter__items--' + modifier);
    });
});
