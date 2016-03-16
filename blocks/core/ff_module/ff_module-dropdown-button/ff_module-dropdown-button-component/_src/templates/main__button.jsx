'use strict';

var React = require('react');

export default class DropdownMainButton extends React.Component {
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
