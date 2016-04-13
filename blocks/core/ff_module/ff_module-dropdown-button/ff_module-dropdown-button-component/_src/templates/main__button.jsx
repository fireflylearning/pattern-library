'use strict';

var React = require('react');

export default class DropdownMainButton extends React.Component {
    render() {

        return  <button type="button"
                    className = {this.props.generateSubClass('ff_module-dropdown-button__button' )}
                    disabled = {!!this.props.isDisabled}
                    {...this.props.rtTrigger}>

                    <span className="ff_module-dropdown-button__content">{this.props.text}</span>

                    {!this.props.isDisabled
                        ? <span
                        className={this.props.generateSubClass('ff_module-dropdown-button__icon')}
                        {...this.props.rtTarget}></span>
                        : null}
                </button>;
    }
}
