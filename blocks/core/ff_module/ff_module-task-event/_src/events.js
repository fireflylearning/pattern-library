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
    error: 'error',
    success: 'success',

    editPending: 'edit-pending',
    editSuccess: 'edit-success',
    editError: 'edit-error',

    deletePending: 'delete-pending',
    deleteSuccess: 'delete-success',
    deleteError: 'delete-error',

    deleted: 'deleted',
    edited: 'edited',


    released: 'released',
    // unreleased: 'unreleased',

    archived: 'archived',
    noConnection: 'no-connection',


};

module.exports.states = states;


