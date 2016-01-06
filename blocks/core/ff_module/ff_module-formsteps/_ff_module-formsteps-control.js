'use strict';

module.exports = function() {
    return {
        isComplete: function isComplete($nextLink, $nextContent, $currentLink, $selectedContent) {
            // if ($nextLink.attr('data-ff-formsteps-target') === 'step2') return true;
            // return false;
            return true;
        },
        canAdvance: function canAdvance($nextLink, $nextContent, $currentLink, $selectedContent) {
            // console.log($nextLink.attr('data-ff-formsteps-target'), $nextContent);
            // if ($nextLink.attr('data-ff-formsteps-target') === 'step2') return false;
            return true;
        }
    }
};
