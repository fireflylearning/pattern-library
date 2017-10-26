'use strict';

var React = require('react'),
    _ = require('underscore');

var Button = require('../ff_module-button/ff_module-button'),
    EditorBase = require('./_src/EditorBase'),
    ContainerDialog = require('../../ff_container/ff_container-dialog/ff_container-dialog'),
    EditorCommon = require('./_src/EditorCommon'),
    EditorMarkAndGrade = require('./_src/EditorMarkAndGrade'),
    EditorAddFile = require('./_src/EditorAddFile'),
    EditorComment = require('./_src/EditorComment'),
    eventTypes = require('../ff_module-task-event/_src/events').types,
    eventStates = require('../ff_module-task-event/_src/events').states,
    getPrimaryButtonText = require('./_src/editorText').getPrimaryButtonText,
    getEditorControls = require('./_src/EditorControls').getEditorControls;


module.exports = React.createClass({
    displayName: 'TaskEventEditor',
    propTypes: {
        event: React.PropTypes.shape({
            description: React.PropTypes.object.isRequired,
            actions: React.PropTypes.array,
            state: React.PropTypes.object
        }).isRequired,
        eventForm: React.PropTypes.object,
        allStudents: React.PropTypes.bool.isRequired,
        studentName: React.PropTypes.string.isRequired,
        releaseMode: React.PropTypes.number.isRequired,
        onSend: React.PropTypes.func.isRequired,
        onNext: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired,
        models: React.PropTypes.object,
        validation: React.PropTypes.object,
        showSaveAndNext: React.PropTypes.bool,
        persistTaskEventState: React.PropTypes.object,
        setInputInitialValue: React.PropTypes.func
    },
    render: function() {
        return getEventEditor(this.props);
    },
    componentDidMount() {
        if (getType(this.props) === 'mark-and-grade' && this.props.persistTaskEventState.markMax) {
            this.props.setInputInitialValue(this.props.models['markMax'], this.props.persistTaskEventState.markMax);
        }
    }
});

function getType(props) {
    var event = props.event || {},
        state = event.state || {},
        type = null;
    if (state.error || state.editError || state.deleteError) {
        type = eventStates.error;
    } else if (event.description && event.description.type) {
        type = event.description.type;
    }
    return type;
}

function getEventEditor(props) {
    var type = getType(props);
    return eventEditorComponents[type] ? eventEditorComponents[type](props) : <EditorInvalid {...props} />;
}


var EventWithMessageEditor = function EventWithMessageEditor(props) {

    var onMessageChange = function(event) {
        props.onChange(_.extend({}, props.event, {
            description: _.extend({}, props.event.description, { message: event.target.value })
        }));
    };

    return (
        <EditorCommon
            messageLabel={props.messageLabel}
            onMessageChange={onMessageChange}
            {...props}
            />
    );
}



var CommentEditor = function CommentEditor(props) {

    var onMessageChange = function(event) {
        props.onChange(_.extend({}, props.event, {
            description: _.extend({}, props.event.description, { message: event.target.value })
        }));
    };

    return (
        <EditorComment
            onMessageChange={onMessageChange}
            {...props}
            />
    );
}

var AddFileEditor = function AddFileEditor(props) {

    var onFileDrop = function(event) {
        props.onChange(_.extend({}, props.event, {
            description: _.extend({}, props.event.description, { files: event.dataTransfer.files } )
        }));
    };

    return (
        <div>
            <br/>
            <EditorAddFile
                event={props.event}
                onFileDrop={onFileDrop}/>
        </div>
    );
}

var MarkAndGradeEditor = function MarkAndGradeEditor(props) {

    function eventUpdater(propertyName) {
        return function(event) {
            var updated = {};
            updated[propertyName] = event.target.value;
            props.onChange(_.extend({}, props.event, {
                description: _.extend({}, props.event.description, updated)
            }));
        };
    }

    var onMarkChange = eventUpdater("mark");
    var onMarkMaxChange = eventUpdater("markMax");
    var onGradeChange = eventUpdater("grade");
    var onMessageChange = eventUpdater("message");

    return (
        <EditorMarkAndGrade
            onMarkChange={onMarkChange}
            onGradeChange={onGradeChange}
            onMarkMaxChange={onMarkMaxChange}
            onMessageChange={onMessageChange}
            {...props} />
    );
}

var DeleteResponseMessage = function DeleteResponseMessage(props) {
    var name = props.allStudents ?
            'all students' :
            props.event.description.author.name;

    return <p>Delete feedback to {name}.<br/>This cannot be undone.</p>
}

var ErrorMessage = function ErrorMessage(props) {
    return <p>We'll try again in a few seconds</p>
}

var InvalidMessage = function InvalidMessage(props) {
    return <p>Something went wrong with this action. If this keeps happening, contact our Support Team.</p>
}

var eventEditorComponents = {};

eventEditorComponents[eventTypes.stampResponseAsSeen] = function StampResponseAsSeen(props) {
    var onNext = function() {
        var newEvent = {
            description: {
                type: eventTypes.stampResponseAsSeen
            }
        };
        props.onNext(newEvent);
    };

    var newProps = _.extend({}, props, { onNext: onNext });

    return (
        <EditorBase
            title="Stamp as Seen"
            controls={getEditorControls('Stamp', newProps, true)}
            {...props}
            >
            <EventWithMessageEditor messageLabel="Feedback" {...newProps} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.requestResubmission] = function RequestResubmission(props) {
    return (
        <EditorBase
            title="Request Resubmission"
            controls={getEditorControls('Request', props, false)}
            {...props}
            >
            <EventWithMessageEditor messageLabel="Reason for Request" {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.confirmTaskIsComplete] = function ConfirmTaskIsComplete(props) {
    return (
        <EditorBase
            title="Confirm as Complete"
            controls={getEditorControls('Confirmation', props, false)}
            {...props}
            >
            <EventWithMessageEditor messageLabel="Feedback" {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.revertTaskToToDo] = function RevertTaskToToDo(props) {
    return (
        <EditorBase
            title="Revert to To Do"
            controls={getEditorControls('Revert', props, false)}
            {...props}
            >
            <EventWithMessageEditor messageLabel="Feedback" {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.confirmStudentIsExcused] = function ConfirmStudentIsExcused(props) {
    return (
        <EditorBase
            title="Confirm as Excused"
            controls={getEditorControls('Confirmation', props, false)}
            {...props}
            >
            <EventWithMessageEditor messageLabel="Feedback" {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.confirmStudentIsUnexcused] = function ConfirmStudentIsUnexcused(props) {
    return (
        <EditorBase
            title="Confirm as Unexcused"
            controls={getEditorControls('Confirmation', props, false)}
            {...props}
            >
            <EventWithMessageEditor messageLabel="Feedback" {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.comment] = function Comment(props) {
    return (
        <EditorBase
            title="Comment"
            controls={getEditorControls('Comment', props, false)}
            {...props}
            >
            <CommentEditor {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.addFile] = function(props){
    return (
        <EditorBase
            title="File"
            controls={getEditorControls('File', props, false)}
            {...props}
            >
            <AddFileEditor {...props} />
        </EditorBase>
    );
};
eventEditorComponents[eventTypes.markAndGrade] = MarkAndGradeEditor; // requires some state to calc text, so all internal
eventEditorComponents[eventTypes.deleteResponse] = function DeleteResponse(props) {

    var titleText='Delete Feedback',
        controls= [
            <Button key="send" onClick={props.onSend} text="Delete" modifier="danger"/>,
            <Button key="close" onClick={props.onClose} text="Cancel" modifier="tertiary"/>
        ];

    return (
        <EditorBase
            title={titleText}
            controls={controls}
            {...props}
            >
            <DeleteResponseMessage {...props}/>
        </EditorBase>
    );
};
eventEditorComponents[eventStates.error] = function EditorError(props) {

    var titleText = "Unable to " + getPrimaryButtonText('Feedback', props),
        controls = [
            <Button key="send" onClick={props.onSend} text="Try again" modifier="primary"/>,
            <Button key="close" onClick={props.onClose} text="Close" modifier="tertiary"/>
        ];

    return (
        <EditorBase
            title={titleText}
            controls={controls}
            {...props}
            >
            <ErrorMessage {...props}/>
        </EditorBase>
    )
};

function EditorInvalid(props) {

    var titleText = "Unable to perform action",
        controls = [
            <Button key="close" onClick={props.onClose} text="Close" modifier="primary"/>
        ];

    return (
        <EditorBase
            title={titleText}
            controls={controls}
            {...props}
            >
            <InvalidMessage {...props}/>
        </EditorBase>
    )
};
