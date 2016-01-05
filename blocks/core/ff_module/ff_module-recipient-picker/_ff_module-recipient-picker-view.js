'use strict';

var React = require('react');
var _ = require('underscore');

module.exports = function() {
    return {
        createPeoplePicker: function createPeoplePicker(service, template) {
            if (!template) throw new Error('recipient-picker requires a \'template\' parameter');
            if (!service) throw new Error('recipient-picker requires a \'service\' parameter');

            return React.createClass({
                render: template,
                componentDidMount: function() {
                    document.addEventListener('click', this.documentClickHandler);

                    var resultfn = function(results) {
                        this.setState({
                            results: results,
                            hasResults: (results && results.length > 0)
                        });
                    }.bind(this);

                    service.getInitialResults(resultfn);
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
                dropdownClickHandler: function(e) {
                    e.nativeEvent.stopImmediatePropagation();
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
                            var newSelection = _.chain(this.state.selected)
                                .reject(function(recipient) {
                                    return recipient.guid === recipientId;
                                })
                                .union(groupMembers)
                                .unique()
                                .value();

                            console.log(newSelection);
                            this.setState({
                                selected: newSelection,
                                hasSelection: (newSelection && newSelection.length > 0)
                            });
                        }

                    }.bind(this);
                    service.getMembersOfGroup(recipientId, resultfn);
                },
                addRecipient: function(resultId) {
                    var result = _.find(this.state.results, function(result) {
                        return result.guid === resultId;
                    });
                    if (!result) return;
                    var newSelection = _.unique(this.state.selected.concat(result));
                    console.log(newSelection);
                    this.setState({
                        selected: newSelection,
                        hasSelection: (newSelection && newSelection.length > 0)
                    });
                },
                clearSelection: function(recipientId) {
                    var newSelection = _.reject(this.state.selected, function(recipient) {
                        return recipient.guid === recipientId;
                    });
                    this.setState({
                        selected: newSelection,
                        hasSelection: (newSelection && newSelection.length > 0)
                    });
                },
                checkIsSelected: function(resultId, selected) {
                    return _.find(selected, function(recipient) {
                        return recipient.guid === resultId;
                    });
                },
                handleInputChange: function(e) {
                    var query = e.target.value,
                        hasQuery;

                    hasQuery = /\S+/.test(query);
                    var resultfn = function(results) {
                        this.setState({
                            hasQuery: hasQuery,
                            isActive: hasQuery,
                            results: results,
                            hasResults: (results && results.length > 0)
                        });
                    }.bind(this);

                    service.getSearchResults(query, resultfn);
                }
            });
        }
    };

};
