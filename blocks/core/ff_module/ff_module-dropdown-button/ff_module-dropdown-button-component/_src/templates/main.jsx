'use strict';

import React from 'react';
import DropdownMainList from './list.jsx';


export default class DropdownMainTemplate extends React.Component {
    render() {
        return  <div className={this.props.generateClass('ff_module-dropdown-button')}
                    data-ff_module-dropdown-button-rt-target={this.props.dropdownLinkId}
                >
                    <DropdownMainButton {...this.props} />
                    <DropdownMainList {...this.props} />
                </div>;
    }
}

class DropdownMainButton extends React.Component {
    render() {
        return <button type="button"
        className = {this.props.generateClass('ff_module-dropdown-button__button' )}
        disabled = {!!this.props.isDisabled}
        data-ff_module-dropdown-button-rt-trigger = { !this.props.isDisabled ? this.props.dropdownLinkId : false }>

        <span className="ff_module-dropdown-button__content">{this.props.text}</span>

        <span
            className="{this.props.generateClass('ff_module-dropdown-button__icon' )}"
            data-ff_module-dropdown-button-rt-target={ !this.props.isDisabled ? this.props.dropdownLinkId : false }></span>
        </button>;
    }
}
