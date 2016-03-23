'use strict';

import React from 'react';
import DropdownMainList from './list.jsx';
import DropdownMainButton from './main__button.jsx';

export default class DropdownMainTemplate extends React.Component {
    render() {
        return  <div className={this.props.generateClass('ff_module-dropdown-button')} ref={this.props.bindRef}
                    {...this.props.rtTarget}>
                    <DropdownMainButton {...this.props} />
                    <DropdownMainList {...this.props} />
                </div>;
    }
}
