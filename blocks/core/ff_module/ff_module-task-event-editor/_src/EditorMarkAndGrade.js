'use strict';

var React = require('react');


module.exports = React.createClass({
    displayName: 'EditorMarkAndGrade',
    render: function(){

        return <div>
            <p>
                Mark:
                <input value={this.props.event.mark} onChange={this.props.onMarkChange} />
                out of
                <input value={this.props.event.markMax} onChange={this.props.onMarkMaxChange} />
            </p>
            <p>
                Grade: <input value={this.props.event.grade} onChange={this.props.onGradeChange} />
            </p>
            <p>Feedback (optional)</p>
            <textarea value={this.props.event.message} onChange={this.props.onMessageChange}></textarea>
        </div>

    }
});
