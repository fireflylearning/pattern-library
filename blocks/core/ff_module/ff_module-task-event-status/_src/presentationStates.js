'use strict';

var presentationStates = {
    default: 'default',

    pendingSend: 'pending-send',
    sent: 'sent',
    erroredSend: 'errored-send',

    pendingSave: 'pending-save',
    saved: 'saved',
    erroredSave: 'errored-save',

    pendingEdit: 'pending-edit',
    pendingEditReleased: 'pending-edit-released',
    edited: 'edited',
    erroredEdit: 'errored-edit',
    erroredEditReleased: 'errored-edit-released',

    pendingDelete: 'pending-delete',
    deleted: 'deleted',
    erroredDelete: 'errored-delete',

    released: 'released',
    unreleased: 'unreleased',

};
module.exports.presentationStates = presentationStates;


var stateClasses = {};
stateClasses[presentationStates.default] = '--is-default';

stateClasses[presentationStates.pendingSend] = '--has-pending-send';
stateClasses[presentationStates.sent] = '--is-sent';
stateClasses[presentationStates.erroredSend] = '--has-errored-send';

stateClasses[presentationStates.pendingSave] = '--has-pending-save';
stateClasses[presentationStates.saved] = '--is-saved';
stateClasses[presentationStates.erroredSave] = '--has-errored-save';

stateClasses[presentationStates.pendingEdit] = '--has-pending-edit';
stateClasses[presentationStates.pendingEditReleased] = '--has-pending-edit-released';
stateClasses[presentationStates.edited] = '--is-edited';
stateClasses[presentationStates.erroredEdit] = '--has-errored-edit';
stateClasses[presentationStates.erroredEditReleased] = '--has-errored-edit-released';

stateClasses[presentationStates.pendingDelete] = '--is-pending-delete';
stateClasses[presentationStates.deleted] = '--is-deleted';
stateClasses[presentationStates.erroredDelete] = '--has-errored-delete';


stateClasses[presentationStates.released] = '--is-released';
stateClasses[presentationStates.unreleased] = '--is-unreleased';

module.exports.stateClasses = stateClasses;
