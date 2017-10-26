---
data:
  -
    modifier: ''
    id: "100"
    to: "Class 8D/Sc"
    postback_href: "#"
    assignment: "Read pages 45-58 of your history coursework books, we'll discuss in class."
    mark_grade:
        - 
            achieved: 8
            possible: 10
            grade_level: "B"

requires: 
    - ff_module-mark-and-grade
---

# React component

<div data-ff_module-task-mark=""></div>

## Props

- **`to`**: {String} Required
- **`assignment`**: {String} Required
- **`postbackHref`**: {String} Required

    Expects data in the format of the Mark and Grade component (ff_module-mark-and-grade)
- **`markGrade`**: {Object}
