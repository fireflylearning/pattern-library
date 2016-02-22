exports.stampResponseAsSeen = function stampResponseAsSeen({ sent, author, message }) {
    return {
        type: types.stampResponseAsSeen,
        sent: sent,
        author: author,
        message: message
    };
}

exports.types = {
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
exports.generateLocalEventId = function generateLocalEventId() {
    return nextEventId++;
}
