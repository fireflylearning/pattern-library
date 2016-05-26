'use strict';

var React = require('react');

var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var ContainerFormLine = require('../blocks/core/ff_container/ff_container-form-line/ff_container-form-line');

var contentItem1 = 'item 1',
    contentItem2 = 'item 2';

var FormFieldDummy = React.createClass({
    displayName: 'FormField',
    render: function(){
        return <div>{this.props.children}</div>;
    }
})

describe('ContainerFormLine', function() {
	it('should render a container with items', function() {
		var element = React.createElement(ContainerFormLine);
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
	});

	it('should render a container with 2 items with appropriate classes', function() {
		var element = <ContainerFormLine>
                        <span>{contentItem1}</span>
                        <span>{contentItem2}</span>
                    </ContainerFormLine>;
		var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-form-line');
        expect(root.getElementsByTagName('span').length).to.equal(2);
        expect(root.textContent).to.equal(contentItem1 + contentItem2);

        expect(root.getElementsByTagName('span')[0].className).to.contain('ff_container-form-line__item');
        expect(root.getElementsByTagName('span')[1].className).to.contain('ff_container-form-line__item');
	});

    it('should render appropriate classes with FormField child elements', function(){

        var element = <ContainerFormLine>
                        <FormFieldDummy><span>{contentItem1}</span><span>{contentItem2}</span></FormFieldDummy>
                        <FormFieldDummy><span>{contentItem1}</span><span>{contentItem2}</span></FormFieldDummy>
                    </ContainerFormLine>;

        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_container-form-line');
        expect(root.getElementsByTagName('span').length).to.equal(4);
        expect(root.getElementsByTagName('span')[0].className).to.contain('ff_container-form-line__item');
        expect(root.getElementsByTagName('span')[1].className).to.contain('ff_container-form-line__item');
        expect(root.getElementsByTagName('span')[2].className).to.contain('ff_container-form-line__item');
        expect(root.getElementsByTagName('span')[3].className).to.contain('ff_container-form-line__item');

        expect(root.getElementsByTagName('div').length).to.equal(2);
        expect(root.getElementsByTagName('div')[0].className).to.equal('');
        expect(root.getElementsByTagName('div')[1].className).to.equal('');
    })

});
