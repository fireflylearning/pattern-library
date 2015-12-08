'use strict';
var React = require('react');
var _ = require('lodash');
var _template = require('./ff_module-recipient-picker.rt.js');


function createPeoplePicker(service, template) {
    template = template || _template;
    // eg var updatedVars = service.update(param);

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
        select:function(result){
            console.log(result);
            var selected = _.unique(this.state.selected.concat(result));
            this.setState({selected: selected});
        },
        handleInputChange: function(e) {
            console.log(e.target.value);
            var query = e.target.value;
            this.setState({query: query});
            var resultfn = function(results){
                this.setState({results: results});
            }.bind(this);

            service.getSearchResults(query, null, null, null, resultfn);
        }


    });
}

module.exports = {
    createPeoplePicker: createPeoplePicker
};
