'use strict';

var React = require('react');
require('./lib/utils').bootstrapBrowser();
var TestUtils = require('react-addons-test-utils');
var expect = require('chai').expect;

var Progress = require('../blocks/core/ff_module/ff_module-progress/ff_module-progress.js');

describe('Progress', function() {

  it('should always render a progress bar', function() {
    var element = React.createElement(Progress, {})
		var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
  })

  it('should always render a progress bar from minimal data', function() {
    var element = React.createElement(Progress, {
      sent_to: 20,
      completed_by: 2,
      marked: 2
    })
    var component = TestUtils.renderIntoDocument(element);
		expect(component).to.exist;
  })

})
