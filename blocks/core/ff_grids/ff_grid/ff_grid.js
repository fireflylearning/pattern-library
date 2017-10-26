'use-strict';

import React from 'react';

function generateClass(base, props) {
    var classNames = [base];
    if (!!props.modifier) classNames.push(base + '--' + props.modifier);
    if (!!props.classes) classNames.push(props.classes);
    if (!!props.disabled) classNames.push(base + '--is-disabled');
    if (!!props.classes && !!props.disabled) classNames.push(props.classes + '--is-disabled');
    return classNames.join(' ');
}

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
	}

	renderColumns(props) {
		let columns = React.Children.map(props.children, (item) => {
			return <div className='ff_grid__column'>
				{item}
			</div>
		})
		return columns;
	}

	render() {
		return <div className={generateClass('ff_grid', this.props)}>
			{this.renderColumns(this.props)}
		</div>	
	}
}

Grid.propTypes = {
	modifier: React.PropTypes.string.isRequired,
	children: React.PropTypes.array.isRequired
}