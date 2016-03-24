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
        displayName: 'RecipientButtonListContainer',
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
        addResults: function(recipients) {
            recipients = [].concat(recipients);
            var uniqueMembers;
            if (this.state.results.length) {
                uniqueMembers = _.reject(recipients, function(member) {
                    return _.any(this.state.results, function(result) {
                        return result.guid === member.guid;
                    });
                }.bind(this));
            } else {
                uniqueMembers = recipients;
            }

            var newSelection = (this.state.results.concat(uniqueMembers));
            // console.log(newSelection);
            this.updateResults(newSelection);
        },
        addResult: function(recipient) {
            this.addResults(recipient);
        },
        componentDidMount: function() {
            service.getGroupsOfType(type, this.updateResults);
            picker.addSubscriber(function(ns){
                this.setState({
                    selected: ns
                });
            }.bind(this));
        },
        //FIXME: Naming add -> select
        addRecipientByResultId: function(recipientId) {
            var result = _.find(this.state.results, function(result) {
                return result.guid === recipientId;
            });
            picker.addRecipient(result);
        }
    });

};
