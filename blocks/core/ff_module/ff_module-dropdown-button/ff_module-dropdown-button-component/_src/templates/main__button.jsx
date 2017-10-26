'use strict';

var React = require('react'),
    generateIconClass = require('../../../../../_lib/_ui/class-utils').generateIconClass,
    generateTextClass = require('../../../../../_lib/_ui/class-utils').generateTextClass,
    IconSVG =  require('../../../../../ff_icons/ff_icon-svg/ff_icon-svg').default;

export default class DropdownMainButton extends React.Component {

    render() {

        var iconEl = this.props.icon ?
                        <span
                            {...this.props.rtTarget}
                            className = {generateIconClass('ff_module-dropdown-button', this.props, '__icon-alt')} />
                        : null;

        var textEl = <span
                        className = {generateTextClass('ff_module-dropdown-button__content', this.props)}
                        >{this.props.text}</span>;

        var mainIconProps = {
          name: 'page-down-open',
          classes: 'ff_module-dropdown-button__icon',
          base: this.props.iconBase || null
        }



        var mainIcon = (!(this.props.isDisabled || this.props.hideArrow))  ?
                        <IconSVG {...mainIconProps}/>
                        : null

        return  <button type="button"
                    title = {this.props.text}
                    id = {this.props.id}
                    className = {this.props.generateSubClass('ff_module-dropdown-button__button' )}
                    disabled = {!!this.props.isDisabled}
                    {...this.props.rtTrigger}>

                    {iconEl}
                    {textEl}
                    {mainIcon}
                </button>;
    }
}
