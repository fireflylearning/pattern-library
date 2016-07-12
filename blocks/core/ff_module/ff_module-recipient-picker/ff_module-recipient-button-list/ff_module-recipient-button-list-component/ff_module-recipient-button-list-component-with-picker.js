'use strict';

var React = require('react');
var _ = require('underscore');

var RecipientButtonList = require('./ff_module-recipient-button-list-component.js');

var id = 0;

module.exports = function(picker, service, type, template) {
    if (!picker) throw new Error('[recipient-list] requires a \'picker\' reference');
    if (!service) throw new Error('[recipient-list] requires a \'service\' parameter');
    if (!type) throw new Error('[recipient-list] requires a \'type\' parameter');

    return React.createClass({
        displayName: 'RecipientButtonListContainer',
        render: function(){
            return (
                <RecipientButtonList
                    results={this.state.results}
                    isSelected={this.picker.checkIsSelected}
                    onSelect={this.addRecipientByResultId}
                />
            );
        },
        picker: picker,
        getInitialState: function() {
            return {
                results: []
            }
        },
        updateResults: function(results) {
            if (this._isMounted) {
                this.setState({
                    results: results
                });
            }
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
            this.updateResults(newSelection);
        },
        addResult: function(recipient) {
            this.addResults(recipient);
        },
        componentWillMount: function(){
            this._id = id++;
        },
        componentWillUnmount: function(){
            this._isMounted = false;
        },
        componentDidMount: function() {
            this._isMounted = true;
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
