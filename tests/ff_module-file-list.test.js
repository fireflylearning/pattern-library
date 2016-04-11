'use strict';
var React = require('react');

require('./lib/utils').bootstrapBrowser();

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var ModuleFileList = require('../blocks/core/ff_module/ff_module-file-list/ff_module-file-list'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, ModuleFileList);

var textContent = {
        titleFile: 'My file',
        titlePage: 'My page',
        href: '#'
    },
    props = {
        files: [{
            title: textContent.titleFile,
            href: textContent.href
        },{
            title: textContent.titlePage,
            href: textContent.href
        },{
            title: textContent.titleFile,
            href: textContent.href
        }]
    };

describe('ModuleFileList', function() {
    var component;

    it('should render', function() {
        var element = React.createElement(ModuleFileList, props);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render '+ props.files.length+ ' files', function(){
        var root = getElementByClass(props, 'ff_module-file-list__items');
        expect(root.querySelectorAll('.ff_module-file-list__item').length).to.equal(props.files.length);
    });

});
