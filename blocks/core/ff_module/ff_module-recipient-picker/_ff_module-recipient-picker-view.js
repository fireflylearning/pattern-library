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
                    service.getInitialResults(this.setResults);
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
                            var newSelection = _.chain(this.state.selected)
                                .reject(function(recipient) {
                                    return recipient.guid === recipientId;
                                })
                                .union(groupMembers)
                                .unique()
                                .value();

                            console.log(newSelection);
                            this.setSelected(newSelection);
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
                    // console.log(newSelection);
                    this.setSelected(newSelection);
                },
                clearSelection: function(recipientId) {
                    var newSelection = _.reject(this.state.selected, function(recipient) {
                        return recipient.guid === recipientId;
                    });
                    this.setSelected(newSelection);
                },
                checkIsSelected: function(resultId, selected) {
                    return _.find(selected, function(recipient) {
                        return recipient.guid === resultId;
                    });
                },
                setResults: function(results) {
                    console.log('Updating results:', results);
                    results = [].concat(results);
                    this.setState({
                        results: results,
                        hasResults: (results && results.length > 0)
                    });
                },
                setSelected: function(selected){
                    selected = [].concat(selected);
                    this.setState({
                        selected: selected,
                        hasSelection: (selected && selected.length > 0)
                    });
                },
                handleInputChange: function(e) {
                    var query = e.target.value,
                        hasQuery;

                    hasQuery = /\S+/.test(query);
                    this.setState({
                        hasQuery: hasQuery,
                        isActive: hasQuery
                    });

                    service.getSearchResults(query, this.setResults);
                }
            });
        }
    };

};
