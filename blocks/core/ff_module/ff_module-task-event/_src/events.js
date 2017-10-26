'use strict';

module.exports.types = {
    setTask: "set-task",
    editTask: 'edit-task',
    stampResponseAsSeen: 'stamp-response-as-seen',
    requestResubmission: 'request-resubmission',
    markAsDone: "mark-as-done",
    markAsUndone: "mark-as-undone",
    confirmTaskIsComplete: 'confirm-task-is-complete',
    confirmStudentIsExcused: 'confirm-student-is-excused',
    comment: 'comment',
    markAndGrade: 'mark-and-grade',
    addFile: 'add-file',

    // unconfirmed response events:
    deleteResponse: 'delete-response',
    editResponse: 'edit-response',
    confirmStudentIsUnexcused: 'confirm-student-is-unexcused',
    revertTaskToToDo: 'revert-task-to-to-do',
    toAllUpdate: 'to-all-update',
    toAllAdd: 'to-all-add',
    toAllDelete: 'to-all-delete',

    // unconfirmed task events:
    deleteTask: 'delete-task',
    releaseFeedbackAndMarks: 'release-feedback-and-marks',
    sendReminder: 'send-reminder',
    archivedTask: 'archive-task',
    unarchivedTask: 'unarchive-task',

    // notification for navigation
    navigateTo: 'navigateTo'
};


var states = {
    default: 'default',

    pending: 'pending',
    error: 'error',
    success: 'success',

    editPending: 'editPending',
    editSuccess: 'editSuccess',
    editError: 'editError',

    deletePending: 'deletePending',
    deleteSuccess: 'deleteSuccess',
    deleteError: 'deleteError',

    deleted: 'deleted',
    edited: 'edited',

    released: 'released',
    complete: 'complete',
    excused: 'excused',

    allStudents: 'allStudents',

    archived: 'archived',
    noConnection: 'noConnection'
};

module.exports.states = states;
