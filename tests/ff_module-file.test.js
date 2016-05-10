'use strict';
var React = require('react');



var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var ModuleFile = require('../blocks/core/ff_module/ff_module-file/ff_module-file'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, ModuleFile);

var textContent = {
        titleFile: 'My file',
        titlePage: 'My page',
        href: '#'
    },
    props = {
        file: {
            title: textContent.titleFile,
            href: textContent.href
        }
    },
    propsNoHref = {
        file: {
            title: textContent.titleFile
        }
    },
    propsPage = {
        file: {
            title: textContent.titleFile,
            type: 'page'
        }
    };

describe('ModuleFile', function() {
    var component;

    it('should render', function() {
        var element = React.createElement(ModuleFile, props);
        var component = TestUtils.renderIntoDocument(element);
        expect(component).to.exist;
    });

    it('should render title element', function(){
        var root = getElementByClass(props, 'ff_module-file__title');
        expect(root.textContent).to.equal(textContent.titleFile);
    });

    it('should render link if \'href\' prop present', function(){
        var root = getElementByClass(props, 'ff_module-file__link');
        expect(root.getAttribute('href')).to.equal(textContent.href);
        expect(root.textContent).to.equal(textContent.titleFile);
    });

    it('should render only title if \'href\' prop not present', function(){
        var attemptToFindNode = function(){
            getElementByClass(propsNoHref, 'ff_module-file__link');
        };
        expect(attemptToFindNode).to.throw(Error, /Did not find/);
        var root = getElementByClass(propsNoHref, 'ff_module-file__title');
        expect(root.textContent).to.equal(textContent.titleFile);
    });

    it('should render appropriate icons for \'type\' prop', function(){
        var fileType = getElementByClass(props, 'ff_module-file__icon'),
            pageType = getElementByClass(propsPage, 'ff_module-file__icon');
        expect(fileType.className).to.equal('ff_icon ff_icon-left ff_module-file__icon ff_icon-file');
        expect(pageType.className).to.equal('ff_icon ff_icon-left ff_module-file__icon ff_icon-computer');
    })
});
