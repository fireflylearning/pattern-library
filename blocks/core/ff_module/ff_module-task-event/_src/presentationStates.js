'use strict';

var presentationStates = {
    deleted: 'deleted',
    edited: 'edited'
};
module.exports.presentationStates = presentationStates;


var stateClasses = {};
stateClasses[presentationStates.deleted] = '--is-deleted';
stateClasses[presentationStates.edited] = '--is-edited';

module.exports.stateClasses = stateClasses;
