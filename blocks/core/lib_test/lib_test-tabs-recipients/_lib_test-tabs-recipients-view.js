'use strict';

var React = require('react');
var _ = require('underscore');

module.exports = function(picker, service, type, template) {
    if (!picker) throw new Error('[recipient-list] requires a \'picker\' reference');
    if (!service) throw new Error('[recipient-list] requires a \'service\' parameter');
    if (!type) throw new Error('[recipient-list] requires a \'type\' parameter');

    return React.createClass({
        render: template,
        picker: picker,
        getInitialState: function() {
            return {
                results: []
            }
        },
        updateResults: function(results) {
            // console.log(results);
            this.setState({
                results: results
            });
        },
        componentDidMount: function() {
            service.getGroupsOfType(type, this.updateResults);
            picker.addSubscriber(function(ns){
                this.setState({
                    selected: ns
                });
            }.bind(this));
        },
        checkIsSelected: function(recipientId) {
            var selected = picker.getSelectedRecipients();
            var r = _.find(selected, function(recipient) {
                return recipient.guid === recipientId;
            });
            // console.log(selected, r);
            return r;
        },
        addRecipientByResultId: function(recipientId) {
            var result = _.find(this.state.results, function(result) {
                return result.guid === recipientId;
            });
            picker.addRecipient(result);
            this.setState({
                lastselected: result
            });
        }
    });

};
