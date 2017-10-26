'use strict';


var React = require('react');
var _ = require('underscore');

var template = require('./ff_module-recipient-picker-component.jsx');

module.exports = function createRecipientPicker(service) {
    if (!template) throw new Error('recipient-picker requires a \'template\' parameter');
    if (!service) throw new Error('recipient-picker requires a \'service\' parameter');
    var firstFocus = true;
    return React.createClass({
        render: template,
        displayName: 'RecipientPicker',
        componentDidMount: function() {
            document.addEventListener('click', this.documentClickHandler);
            service.getInitialSearchResults(this.setResults);
            service.getInitialSelectedRecipients(this.addRecipients);
            firstFocus = true;
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
        //FIXME: Naming add -> select
        addRecipients: function(recipients) {
            recipients = [].concat(recipients);
            var uniqueGroupMembers, newSelection;

            if (this.state.selected.length) {
                uniqueGroupMembers = _.reject(recipients, function(member) {
                    return _.any(this.state.selected, function(result) {
                        return result.guid === member.guid;
                    });
                }.bind(this));
            } else {
                uniqueGroupMembers = recipients;
            }

            newSelection = (this.state.selected.concat(uniqueGroupMembers));

            this.setSelected(newSelection);
        },
        //FIXME: Naming add -> select
        addRecipient: function(recipient) {
            this.addRecipients(recipient);
        },
        //FIXME: Naming add -> select
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
                if (this.props.noFocusOnLoad) {
                    if (!firstFocus) this.textInput.focus();
                } else {
                    this.textInput.focus();
                }
            }
            firstFocus = false;
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

