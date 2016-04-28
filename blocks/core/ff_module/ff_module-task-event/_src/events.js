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

    pendingSend: 'pending-send',
    sent: 'sent',
    erroredSend: 'errored-send',

    pendingSave: 'pending-save',
    saved: 'saved',
    erroredSave: 'errored-save',

    pendingEdit: 'pending-edit',
    edited: 'edited',
    erroredEdit: 'errored-edit',

    pendingDelete: 'pending-delete',
    deleted: 'deleted',
    erroredDelete: 'errored-delete',

    released: 'released',
    unreleased: 'unreleased',

    archived: 'archived',
    noConnection: 'no-connection'
};

module.exports.states = states;

var stateClasses = {};
stateClasses[states.default] = '--is-default';

stateClasses[states.pendingSend] = '--has-pending-send';
stateClasses[states.sent] = '--is-sent';
stateClasses[states.erroredSend] = '--has-errored-send';

stateClasses[states.pendingSave] = '--has-pending-save';
stateClasses[states.saved] = '--is-saved';
stateClasses[states.erroredSave] = '--has-errored-save';

stateClasses[states.pendingEdit] = '--has-pending-edit';
stateClasses[states.edited] = '--is-edited';
stateClasses[states.erroredEdit] = '--has-errored-edit';

stateClasses[states.pendingDelete] = '--is-pending-delete';
stateClasses[states.deleted] = '--is-deleted';
stateClasses[states.erroredDelete] = '--has-errored-delete';


stateClasses[states.released] = '--is-released';
stateClasses[states.unreleased] = '--is-unreleased';

module.exports.stateClasses = stateClasses;


