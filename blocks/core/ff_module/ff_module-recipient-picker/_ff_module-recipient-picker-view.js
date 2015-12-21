'use strict';

var React = require('react');
var _ = require('lodash');

module.exports = function() {
    return {
        createPeoplePicker: function createPeoplePicker(service, template) {
            if (!template) throw new Error('recipient-picker requires a template parameter');

            return React.createClass({
                render: template,
                getInitialState: function() {
                    var results = service.getInitialResults();
                    var selected = [];
                    return {
                        results: results,
                        hasResults: (results && results.length),
                        selected: selected,
                        hasSelection: false,
                        isActive: false
                    };
                },
                select: function(result) {
                    console.log(result);
                    var newSelection = _.unique(this.state.selected.concat(result));
                    this.setState({
                        selected: newSelection,
                        hasSelection: (newSelection && newSelection.length > 0)
                    });
                },
                clearSelection: function(result) {
                    var newSelection = _.without(this.state.selected, result);
                    this.setState({
                        selected: newSelection,
                        hasSelection: (newSelection && newSelection.length > 0)
                    });
                },
                handleInputChange: function(e) {
                    console.log(e.target.value);
                    var query = e.target.value,
                        activeState;

                    if (_.trim(query) === '') {
                        activeState = false;
                    } else {
                        activeState = true;
                    }

                    var resultfn = function(results) {
                        this.setState({
                            results: results,
                            isActive: activeState,
                            hasResults: (results && results.length > 0)
                        });
                    }.bind(this);

                    service.getSearchResults(query, resultfn);
                }
            });
        }
    };

};
