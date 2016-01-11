'use strict';

var React = require('react');
var _ = require('underscore');

module.exports = function createRecipientPicker(service, template) {
    if (!template) throw new Error('recipient-picker requires a \'template\' parameter');
    if (!service) throw new Error('recipient-picker requires a \'service\' parameter');
    return React.createClass({
        render: template,
        componentDidMount: function() {
            document.addEventListener('click', this.documentClickHandler);

            service.getInitialResults(this.setResults);
            this.resetInput();
        },
        componentWillUnmount: function() {
            document.removeEventListener('click', this.documentClickHandler);
        },
        documentClickHandler: function() {
            this.setState({
                isActive: false
            });
        },
        triggerClickHandler: function() {
            this.setState({
                isActive: !!(this.state.hasQuery)
            });
        },
        stopEventPropagation: function(e) {
            e.nativeEvent.stopImmediatePropagation();
        },
        getSelectedRecipients: function() {
            return this.state.selected;
        },
        getInitialState: function() {
            return {
                results: [],
                hasResults: false,
                selected: [],
                hasSelection: false,
                isActive: false
            };
        },
        expandGroup: function(recipientId) {
            var resultfn = function(groupMembers) {
                if (groupMembers) {

                    var uniqueGroupMembers = _.reject(groupMembers, function(member) {
                        return _.any(this.state.selected, function(result) {
                            return result.guid === member.guid;
                        });
                    }.bind(this));

                    var newSelection = _.chain(this.state.selected)
                        .reject(function(recipient) {
                            return recipient.guid === recipientId;
                        })
                        .union(uniqueGroupMembers)
                        .value();

                    this.setSelected(newSelection);
                }
            }.bind(this);
            service.getMembersOfGroup(recipientId, resultfn);
        },
        addRecipient: function(recipient) {

            var uniqueGroupMembers = _.reject([recipient], function(member) {
                return _.any(this.state.selected, function(result) {
                    return result.guid === member.guid;
                });
            }.bind(this));

            var newSelection = (this.state.selected.concat(uniqueGroupMembers));
            // console.log(newSelection);
            this.setSelected(newSelection);
        },
        addRecipientByResultId: function(resultId) {
            var recipient = _.find(this.state.results, function(result) {
                return result.guid === resultId;
            });
            if (!recipient) return;
            this.addRecipient(recipient);



        },
        _subscribers: [],
        addSubscriber: function(callback) {
            this._subscribers.push(callback);
        },
        resetInput: function() {
            this.setState({
                hasQuery: false,
                isActive: false
            });
            if (this.textInput) {
                this.textInput.value = '';
                this.textInput.focus();
            }
        },
        removeRecipientFromSelection: function(recipientId) {
            var newSelection = _.reject(this.state.selected, function(recipient) {
                return recipient.guid === recipientId;
            });
            this.setSelected(newSelection);

        },
        checkIsSelected: function(resultId) {
            return _.find(this.state.selected, function(recipient) {
                return recipient.guid === resultId;
            });
        },
        setResults: function(results) {
            // console.log('Updating results:', results);
            results = [].concat(results);
            this.setState({
                results: results,
                hasResults: (results && results.length > 0)
            });
        },
        setSelected: function(selected) {
            selected = [].concat(selected);
            this.setState({
                selected: selected,
                hasSelection: (selected && selected.length > 0)
            });

            this._subscribers.forEach(function(subscription) {
                subscription(selected);
            });
            this.resetInput();
        },
        handleInputChange: function(e) {
            var query = e.target.value,
                hasQuery;

            hasQuery = /\S+/.test(query);
            var resultsFn = function(results) {
                this.setResults(results);
                this.setState({
                    hasQuery: hasQuery,
                    isActive: hasQuery
                });
            }.bind(this);


            service.getSearchResults(query, resultsFn);
        }
    });

};
