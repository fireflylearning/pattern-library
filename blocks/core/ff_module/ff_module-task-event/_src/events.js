'use strict';

module.exports.types = {
    setTask: 'set-task',
    stampResponseAsSeen: 'stamp-response-as-seen',
    requestResubmission: 'request-resubmission',
    confirmTaskIsComplete: 'confirm-task-is-complete',
    confirmStudentIsExcused: 'confirm-student-is-excused',
    comment: 'comment',
    markAndGrade: 'mark-and-grade',
    addFile: 'add-file',

    // unconfirmed response events:
    deleteResponse: 'delete-response',
    editResponse: 'edit-response',
    confirmStudentIsUnexcused: 'confirm-student-is-unexcused',

    // unconfirmed task events:
    deleteTask: 'delete-task',
    releaseFeedbackAndMarks: 'release-feedback-and-marks',
    sendReminder: 'send-reminder',
    archivedTask: 'archived-task'
};


var states = {
    default: 'default',

    pending: 'pending',
    saved: 'saved',
    error: 'error',

    editing: 'editing',
    edited: 'edited',
    errorEditing: 'error-editing',

    deleting: 'deleting',
    deleted: 'deleted',
    errorDeleting: 'error-deleting',

    released: 'released',
    unreleased: 'unreleased',

    archived: 'archived',
    noConnection: 'no-connection'
};

module.exports.states = states;

var stateClasses = {};
stateClasses[states.default] = '--no-status';

stateClasses[states.pending] = '--is-pending';
stateClasses[states.saved] = '--is-saved';
stateClasses[states.error] = '--has-error';

stateClasses[states.pendingEdit] = '--is-pending-edit';
stateClasses[states.edited] = '--is-edited';
stateClasses[states.errorEditing] = '--has-error-editing';

stateClasses[states.pendingDelete] = '--is-pending-delete';
stateClasses[states.deleted] = '--is-deleted';
stateClasses[states.errorDeleting] = '--has-error-deleting';

stateClasses[states.released] = '--is-released';
stateClasses[states.unreleased] = '--is-unreleased';

module.exports.stateClasses = stateClasses;


