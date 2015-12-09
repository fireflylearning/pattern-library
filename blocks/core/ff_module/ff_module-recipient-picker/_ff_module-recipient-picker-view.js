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
                        selected: selected,
                        query: ''
                    };
                },
                select: function(result) {
                    console.log(result);
                    var selected = _.unique(this.state.selected.concat(result));
                    this.setState({
                        selected: selected
                    });
                },
                handleInputChange: function(e) {
                    console.log(e.target.value);
                    var query = e.target.value;
                    this.setState({
                        query: query
                    });
                    var resultfn = function(results) {
                        this.setState({
                            results: results
                        });
                    }.bind(this);

                    service.getSearchResults(query, null, null, null, resultfn);
                }
            });
        }
    };

};
