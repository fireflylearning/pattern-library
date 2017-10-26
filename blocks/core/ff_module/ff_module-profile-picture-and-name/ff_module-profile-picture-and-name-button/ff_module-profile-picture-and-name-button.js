'use strict';

var React = require('react');

module.exports = React.createClass({
    displayName: 'ResultButton',
    getInitialState: function() {
        return {
            showImage: false
        }
    },
    lazyLoadPictures: function(props) {
        if(props.offsetHeight + props.scrollPosition > this.refs.profilePictureButton.offsetTop && props.scrollPosition < this.refs.profilePictureButton.offsetTop + this.refs.profilePictureButton.offsetHeight) {
            this.setState({ 
                showImage: true
            });
        }
    },
    componentDidMount: function() {
        this.lazyLoadPictures(this.props);
    },
    componentWillReceiveProps: function(nextProps) {
         this.lazyLoadPictures(nextProps);
    },
    render: function() {
        var className = "ff_module-profile-picture-and-name-button" + (this.props.isSelected ? ' ff_module-profile-picture-and-name-button--is-selected' : '');
        var image = this.state.showImage ? this.props.pic_href : null;

        return (
            <button
                ref="profilePictureButton" 
                type="button"
                className={className}
                data-guid={this.props.guid}
                onClick={this.props.onSelect}
                disabled={this.props.isSelected}
                >
                <figure className="ff_module-profile-picture-and-name-button__picture">
                    <img className="ff_module-profile-picture-and-name-button__image" src={image} />
                </figure>
                <span className="ff_module-profile-picture-and-name-button__title">{this.props.label} </span>
            </button>
        );
    },

});
