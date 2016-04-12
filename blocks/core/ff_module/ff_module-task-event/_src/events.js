'use strict';

module.exports.types = {
    setTask: 'set-task',
    stampResponseAsSeen: 'stamp-response-as-seen',
    requestResubmission: 'request-resubmission',
    confirmTaskIsComplete: 'confirm-task-is-complete',
    confirmStudentIsExcused: 'confirm-student-is-excused',
    comment: 'comment',
    markAndGrade: 'mark-and-grade',
    // unconfirmed response events:
    deleteResponse: 'delete-response',
    confirmStudentIsUnexcused: 'confirm-student-is-unexcused',
    addFile: 'add-file',
    // unconfirmed task events:
    deleteTask: 'delete-task',
    releaseFeedbackAndMarks: 'release-feedback-and-marks',
    sendReminder: 'send-reminder'
};

module.exports.states = {
    default: 'default',
    error: 'error',
    pending: 'pending',
    sent: 'sent',
    released: 'released',
    unreleased: 'unreleased',
    deleted: 'deleted',
    edited: 'edited'
};
