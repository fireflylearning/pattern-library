'use strict';

import React from 'react';

import DropdownButton from '../ff_module-dropdown-button/ff_module-dropdown-button-component/ff_module-dropdown-button-component';
import { types as listItemTypes } from '../ff_module-form-input/_src/types';


export class DropdownFilters extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'DropdownFilters';
    }
    render() {
        var list = this.props.filters.map(filter => {
            return {
                type: listItemTypes.checkbox,
                id: filter.id,
                text: filter.name,
                checked: filter.isActive,
                onChange: event => this.onChange(filter.id, event) };
        });

        return <DropdownButton
                    text = { this.props.text }
                    list = { list }
                    classes= {this.props.classes ? this.props.classes + ' ff_module-dropdown-filters' : 'ff_module-dropdown-filters'}
                    isOpen = { this.props.isOpen }
                    isDisabled = { this.props.isDisabled }
                    modifier = { this.props.modifier }/>
    }
    onChange(filter, event) {
        if (event.target.checked) {
            this.props.onAddFilter(filter);
        } else {
            this.props.onRemoveFilter(filter);
        }
    }
}
DropdownFilters.propTypes = {
    text: React.PropTypes.string.isRequired,
    onAddFilter: React.PropTypes.func.isRequired,
    onRemoveFilter: React.PropTypes.func.isRequired,
    filters: React.PropTypes.array.isRequired
};

module.exports = DropdownFilters;
