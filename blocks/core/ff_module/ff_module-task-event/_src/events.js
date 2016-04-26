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
    error: 'error',
    pending: 'pending',
    editing: 'editing',
    deleting: 'deleting',
    saved: 'saved', // May remove & just check for removal of pending
    edited: 'edited',
    deleted: 'deleted',
    released: 'released',
    unreleased: 'unreleased',

    archived: 'archived',
    noConnection: 'no-connection'
};
module.exports.states = states;

var stateClasses = {};
stateClasses[states.default] = '--no-status';
stateClasses[states.error] = '--has-error';
stateClasses[states.pending] = '--is-pending';
stateClasses[states.editing] = '--is-editing';
stateClasses[states.deleting] = '--is-deleting';
stateClasses[states.saved] = '--is-saved';
stateClasses[states.edited] = '--is-edited';
stateClasses[states.deleted] = '--is-deleted';
stateClasses[states.released] = '--is-released';
stateClasses[states.unreleased] = '--is-unreleased';
module.exports.stateClasses = stateClasses;


