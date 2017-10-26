'use strict';

var React = require('react');
var ResultButton = require('../../../ff_module-profile-picture-and-name/ff_module-profile-picture-and-name-button/ff_module-profile-picture-and-name-button');
var generateClass = require('../../../../_lib/_ui/class-utils').generateStandardClass;
import * as _ from "underscore";

const spinnerHref = "Templates/lib/core/patterns/images/loading_spinner.gif";

module.exports = React.createClass({
    displayName: 'RecipientButtonList',
    propTypes: {
        results: React.PropTypes.array.isRequired,
        isSelected: React.PropTypes.func.isRequired,
        onSelect: React.PropTypes.func.isRequired
    },
    scrollTimer: null,
    getInitialState: function() {
        return {
            scrollPosition: 0,
            offsetHeight: 0
        }
    },
    calculateScrollPosition: function(e) {
        var scrollTop = e.target.scrollTop;
        var height = this.refs.buttonList.offsetHeight;
        if ( this.scrollTimer ) {
            clearTimeout(this.scrollTimer);
        }

        this.scrollTimer = setTimeout(function() { 
            this.setState({ 
                scrollPosition: scrollTop,
                offsetHeight: height
            }); 
        }.bind(this), 200);
    
    },
    componentDidMount: function() {
        this.setState({ 
            offsetHeight: this.refs.buttonList.offsetHeight,
            scrollPosition: 0
        });
    },
    componentDidUpdate: function(prevProps, prevState) {
        var offsetHeight = this.refs.buttonList.offsetHeight;
        if (offsetHeight != prevState.offsetHeight) {
            this.setState({
                offsetHeight: offsetHeight
            });
        }
    },
    render: function(){
        var recipients;
        if (this.props.loaded) {
            recipients = <ul className="ff_module-recipient-button-list__list">
            {this.props.results.map(result=>
                <li className="ff_module-recipient-button-list__item"
                    key={result.guid}>
                    <ResultButton guid={result.guid}
                        label={result.label}
                        pic_href={result.pic_href}
                        isSelected={this.props.isSelected(result.guid)}
                        offsetHeight={this.state.offsetHeight}
                        parent={this.refs.buttonList}
                        scrollPosition={this.state.scrollPosition}
                        onSelect={()=>this.props.onSelect(result.guid)} />
                </li>
            )}</ul>;
        } else {
            recipients = <div className="ff_module-recipient-button-list--is-loading">
                <img className="ff_module-recipient-button-list__spinner" src={spinnerHref}/>
            </div>;
        }
        return <div ref="buttonList" 
                        onScroll={this.calculateScrollPosition} 
                        className={generateClass('ff_module-recipient-button-list', this.props)}>
                        {recipients}
                </div>;
    }
});
