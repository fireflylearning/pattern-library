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
    confirmStudentIsUnexcused: 'confirm-student-is-unexcused',

    // unconfirmed task events:
    deleteTask: 'delete-task',
    releaseFeedbackAndMarks: 'release-feedback-and-marks',
    sendReminder: 'send-reminder',
    archivedTask: 'archived-task'
};

var states = module.exports.states = {
    default: 'default',
    error: 'error',
    pending: 'pending',
    saved: 'saved', // May remove & just check for removal of pending
    released: 'released',
    unreleased: 'unreleased',
    deleted: 'deleted',
    edited: 'edited',
    archived: 'archived',
    noConnection: 'no-connection'
};

var stateClasses = {};
stateClasses[states.default] = '--no-status';
stateClasses[states.pending] = '--is-pending';
stateClasses[states.error] = '--has-error';
stateClasses[states.saved] = '--is-saved';
stateClasses[states.unreleased] = '--is-unreleased';
stateClasses[states.released] = '--is-released';
stateClasses[states.deleted] = '--is-deleted';
module.exports.stateClasses = stateClasses;


