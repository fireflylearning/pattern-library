'use strict';
var React = require('react');

var TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect;

var TaskMetaActions = require('../blocks/core/ff_module/ff_module-task-meta-actions/ff_module-task-meta-actions'),
    Button = require('../blocks/core/ff_module/ff_module-button/ff_module-button'),
    DropdownButton = require('../blocks/core/ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component'),
    DropdownFilters = require('../blocks/core/ff_module/ff_module-dropdown-filters/ff_module-dropdown-filters'),

    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, TaskMetaActions);

var filterProps = {
        text: '[Filter by Status]',
        modifier: 'compact-widelist',
        onAddFilter: function(id, event) { console.log('Adding ' + id); },
        onRemoveFilter: function(id, event) { console.log('Removing ' + id); },
        filters: [{
            name: '[Awaiting Response]',
            id: 'filter-1'
        }, {
            isActive: true,
            name: '[Approved]',
            id: 'filter-2'
        }, {
            name: '[Response Received]',
            id: 'filter-3'
        }]
    },
    buttonProps = {
        text: '[Send All Now]',
        modifier: 'compact',
        onClick: function() {}
    },
    dropdownProps = {
        text: '[More Actions]',
        modifier: 'compact-right-widelist',
        list: [{ text: '[Edit]', onClick: function(event) { console.log(event); } }]
    },

    props = [{
        state: {},
        description: {
            numRecipientsAffected: 43,
            author: { name: 'Terry Teacher' }
        },
        filters: <DropdownFilters {...filterProps} />,
        singleButtons: [<Button key="send-all-now" {...buttonProps}/>],
        groupedActions: <DropdownButton {...dropdownProps}/>
    }, {
        state: {
            archived: true
        }
    }];




describe('TaskMetaActions', function() {

    it('should render', function(){
        var root = getElementByClass(props[0], 'ff_module-task-meta-actions');
        expect(root).to.exist;
    });

    it('should display \'archived\' state when prop supplied', function(){
        var root = getElementByClass(props[1], 'ff_util-prose__text-block--notify');
        expect(root).to.exist;
        expect(root.textContent).to.equal('This task is archived');
    });

    it('should display appropriate components for supplied props', function(){
        var element = React.createElement(TaskMetaActions, props[0]);
        var component = TestUtils.renderIntoDocument(element);

        var buttons = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-button--compact');
        expect(buttons).to.exist;

        var dropdownButtons = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-button--compact-right-widelist');
        var ddLis = dropdownButtons.querySelectorAll('li');
        expect(dropdownButtons).to.exist;
        expect(ddLis.length).to.equal(dropdownProps.list.length);

        var filters = TestUtils.findRenderedDOMComponentWithClass(component, 'ff_module-dropdown-filters');
        var fLis = filters.querySelectorAll('li');
        expect(filters).to.exist;
        expect(fLis.length).to.equal(filterProps.filters.length);

    });

    it('should display appropriate number of affected recipients', function(){
        var numAffectedEl = getElementByClass(props[0], 'ff_module-task-meta-actions__num-affected');
        expect(numAffectedEl.textContent).to.equal('Send feedback and marks to '+ props[0].description.numRecipientsAffected+' students');
    });

});
