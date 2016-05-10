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

// var presentationStates = {
//     default: 'default',

//     pendingSend: 'pending-send',
//     sent: 'sent',
//     erroredSend: 'errored-send',

//     pendingSave: 'pending-save',
//     saved: 'saved',
//     erroredSave: 'errored-save',

//     pendingEdit: 'pending-edit',
//     pendingEditReleased: 'pending-edit-released',
//     edited: 'edited',
//     erroredEdit: 'errored-edit',
//     erroredEditReleased: 'errored-edit-released',

//     pendingDelete: 'pending-delete',
//     deleted: 'deleted',
//     erroredDelete: 'errored-delete',

//     released: 'released',
//     unreleased: 'unreleased',

// };
// // module.exports.presentationStates = presentationStates;

// var stateClasses = {};
// stateClasses[presentationStates.default] = '--is-default';

// stateClasses[presentationStates.pendingSend] = '--has-pending-send';
// stateClasses[presentationStates.sent] = '--is-sent';
// stateClasses[presentationStates.erroredSend] = '--has-errored-send';

// stateClasses[presentationStates.pendingSave] = '--has-pending-save';
// stateClasses[presentationStates.saved] = '--is-saved';
// stateClasses[presentationStates.erroredSave] = '--has-errored-save';

// stateClasses[presentationStates.pendingEdit] = '--has-pending-edit';
// stateClasses[presentationStates.pendingEditReleased] = '--has-pending-edit-released';
// stateClasses[presentationStates.edited] = '--is-edited';
// stateClasses[presentationStates.erroredEdit] = '--has-errored-edit';
// stateClasses[presentationStates.erroredEditReleased] = '--has-errored-edit-released';

// stateClasses[presentationStates.pendingDelete] = '--is-pending-delete';
// stateClasses[presentationStates.deleted] = '--is-deleted';
// stateClasses[presentationStates.erroredDelete] = '--has-errored-delete';


// stateClasses[presentationStates.released] = '--is-released';
// stateClasses[presentationStates.unreleased] = '--is-unreleased';

// module.exports.stateClasses = stateClasses;


