'use strict';

module.exports = function() {
    return {
        getSelectedRecipients: function(results) {
            console.log('[mock picker] getSelectedRecipients', results);
        },
        setSelected: function(results) {
            console.log('[mock picker] setSelected', results);
        },
        checkIsSelected: function(recipientId) {
            console.log('[mock picker] checkIsSelected ', recipientId);
        },
        addSubscriber: function(method) {
            console.log('[mock picker] addSubscriber ', method);
        },
        addRecipient: function(recipientId){
            console.log('[mock picker] addRecipient ', recipientId);
        }
    };
};
