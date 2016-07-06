'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var ExpandableComponent = require('../blocks/core/ff_container/ff_container-expandable-component/ff_container-expandable-component');

var expandedText = '[Expanded state header]',
    collapsedText = '[Collapsed state header]',
    contentText = '[Content]';

describe('ExpandableComponent', function() {

    it('should render an expandable component', function() {
        var component = getComponent({ expandedText: expandedText, collapsedText: collapsedText });
        expect(component).to.exist;
    });


    it('should render a collapsed-state header of ' + collapsedText + ' on load', function() {
        var component = getComponent({ expandedText: expandedText, collapsedText: collapsedText });
        var header = getElement(component, 'ff_container-expandable__header');
        expect(ReactDOM.findDOMNode(header).textContent).to.equal(collapsedText);
    });

    it('should render an expanded-state header of ' + expandedText + ' when clicked', function(done) {
        var component = getComponent({ expandedText: expandedText, collapsedText: collapsedText });
        var header = getElement(component, 'ff_container-expandable__header');

        simulateNonReactClick(header);

        setTimeout(function() {
            expect(header.textContent).to.equal(expandedText);
            done();
        }, 10);
    });

    it('should render a content area with content ' + contentText + ' on load', function() {
        var component = getComponent({ expandedText: expandedText, collapsedText: collapsedText });
        var content = getElement(component, 'ff_container-expandable__content');
        expect(ReactDOM.findDOMNode(content).textContent).to.equal(contentText);
    });

    it('should have a collapsed state on load', function() {
        var component = getComponent({ expandedText: expandedText, collapsedText: collapsedText });
        var root = ReactDOM.findDOMNode(component);
        expect(root.className).to.equal('ff_container-expandable ff_container-expandable--is-collapsed');
    });

    it('should remove the collapsed state on click', function(done) {
        var component = getComponent({ expandedText: expandedText, collapsedText: collapsedText });
        var root = ReactDOM.findDOMNode(component);
        var header = getElement(component, 'ff_container-expandable__header');

        simulateNonReactClick(header);

        setTimeout(function() {
            expect(root.className).to.equal('ff_container-expandable');
            done();
        }, 10);
    });
});

function getComponent(props) {
    var element = React.createElement(ExpandableComponent, props, React.createElement('span', {}, contentText));
    return TestUtils.renderIntoDocument(element);
}

function getElement(component, className) {
    return TestUtils.findRenderedDOMComponentWithClass(component, className);
}

function simulateNonReactClick(element) {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, true);
    element.dispatchEvent(evt);
}
