'use strict';

module.exports = function() {
    return {
        isComplete: function isComplete($nextLink, $nextContent, $currentLink, $selectedContent) {
            // perform validation
            return true;
        },
        canAdvance: function canAdvance($nextLink, $nextContent, $currentLink, $selectedContent) {
            if ($nextLink.attr('data-ff-tabs-target') === 'tab2') return true;
            return false;
        }
    }
};
