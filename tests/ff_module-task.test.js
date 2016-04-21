'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var Task = require('../blocks/core/ff_module/ff_module-task/ff_module-task.js'),
    Progress = require('../blocks/core/ff_module/ff_module-progress/ff_module-progress.js'),
    getElementByClass = require('./lib/framework').setupGetElementByClass(React, TestUtils, Task);

describe('Task', function() {

  it('should always render the Task component', function() {
    var element = React.createElement(Task, {});
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
  });
  
  it('should render a \'meta\' element if \'from\' prop is supplied', function() {
    var metaTag = getElementByClass({from: '[from value]'}, 'ff_module-task__meta');
    expect(metaTag.textContent).to.equal('Set by [from value]');
  });

  it('should not render a \'meta\' element if \'from\' prop is not supplied', function() {
    var attemptToFindNode = function(){
      getElementByClass({from: ''}, 'ff_module-task__meta');
    };
    expect(attemptToFindNode).to.throw(Error, /Did not find/);
  });

  it('should render a \'message\' value if \'message\' prop is supplied', function() {
    var message = getElementByClass({message: '[message value]'}, 'ff_module-task__link');
    expect(message.textContent).to.equal('[message value]');
  });

  it('should populate a \'link\' attribute if \'linkHref\' prop is supplied', function() {
    var linkAttr = getElementByClass({linkHref: '[linkHref value]'}, 'ff_module-task__link');
    expect(linkAttr.getAttribute('href')).to.equal('[linkHref value]');
  });

  it('should render a \'to\' value if \'to\' prop is supplied', function() {
    var to = getElementByClass({to: '[to value]'}, 'ff_module-task__item--to');
    expect(to.textContent).to.equal('[to value]');
  });

  it('should render a \'date\' element if \'duedate\' prop is supplied', function() {
    var dateTag = getElementByClass({duedate: '[duedate value]'}, 'ff_module-task__item--date');
    expect(dateTag.textContent).to.equal('Due [duedate value]');
  });

  it('should not render a \'date\' element if \'duedate\' prop is not supplied', function() {
    var attemptToFindNode = function(){
      getElementByClass({duedate: ''}, 'ff_module-task__item--date');
    };
    expect(attemptToFindNode).to.throw(Error, /Did not find/);
  });

  it('should test whether a \'Progress\' component is rendered if \'progress\' prop is supplied', function() {
    var element = React.createElement(Task, {
      progress: {
        sentTo: 23,
        numExcused: 2, 
        completedBy: 20, 
        marked: 3
      }
    });
    var parentComponent = TestUtils.renderIntoDocument(element);
    var childComponent = TestUtils.findRenderedComponentWithType(parentComponent, Progress);
    expect(childComponent).to.exist;
  });

});