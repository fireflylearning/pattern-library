'use strict';


module.exports.types = {
    setTask: "set-task",
    stampResponseAsSeen: "stamp-response-as-seen",
    requestResubmission: "request-resubmission",
    confirmTaskIsComplete: "confirm-task-is-complete",
    confirmStudentIsExcused: "confirm-student-is-excused",
    comment: "comment",
    markAndGrade: "mark-and-grade"
};

var nextEventId = 1;
// Local event IDs are local to the client
// They have no meaning except to uniquely identify events
module.exports.generateLocalEventId = function generateLocalEventId() {
    return nextEventId++;
}
