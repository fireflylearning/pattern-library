'use strict';
var React = require('react'),
    ReactDOM = require('react-dom');

require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    sinon = require('sinon');


var FormAddAttachment = require('../blocks/core/ff_module/ff_module-form-add-attachment/ff_module-form-add-attachment'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, FormAddAttachment);

var props = {
    fileSources: [
        { text: 'Source One', onClick: sinon.spy()},
        { text: 'Source Two', onClick: sinon.spy()},
        { text: 'Source Three', onClick: sinon.spy()},
    ],
    onFileDrop: sinon.spy(),
    files:[{name:'resource696.jpeg', type:'image/jpeg'}]
};

describe('FormAddAttachment', function() {

    it('should render', function() {
        var element = React.createElement(FormAddAttachment, props);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });


    it('should render a dropdown button with fileSources data', function(){
        var root = getElementByClass(props, 'ff_module-dropdown-button ff_module-dropdown-button--block');
        var list = root.getElementsByTagName('li');
        expect(root).to.exist;
        expect(list.length).to.equal(props.fileSources.length);
    });

    it('should fire onDrop handler when drop event occurs', function(){
        var root = getElementByClass(props, 'ff_module-form-add-attachment__dnd');
        var event = { files: [{ name: 'file-name', type: 'image/jpeg' }] };
        TestUtils.Simulate.drop(root, { dataTransfer: event });
        expect(props.onFileDrop.called).to.be.true;
        expect(props.onFileDrop.args[0][0].dataTransfer).to.equal(event);
    });

    it('should add active class on drag enter event and remove active class on drag leave or drop', function(){
        var element = React.createElement(FormAddAttachment, props);
        var component = TestUtils.renderIntoDocument(element);
        var root = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-add-attachment');
        var dnd = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-form-add-attachment__dnd');
        TestUtils.Simulate.dragEnter(dnd);
        expect(root.className).to.equal('ff_module-form-add-attachment ff_module-form-add-attachment--is-active');
        TestUtils.Simulate.dragLeave(dnd);
        expect(root.className).to.equal('ff_module-form-add-attachment');
        TestUtils.Simulate.dragEnter(dnd);
        expect(root.className).to.equal('ff_module-form-add-attachment ff_module-form-add-attachment--is-active');
        TestUtils.Simulate.drop(dnd);
        expect(root.className).to.equal('ff_module-form-add-attachment');
    });

    it('should render list of provided files');


});
