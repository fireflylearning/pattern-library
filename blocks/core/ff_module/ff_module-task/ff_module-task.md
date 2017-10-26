---
data:
  -
    modifier: ''
    id: "100"
    message: "Read pages 45-58 of your history coursework books, we'll discuss in class."
    link_href: "#"
    from: "Terrance Teacher"
    to: "Class 8y/En1"
    fuzzy_date: "Tomorrow"
    duedate: "27/08/2018"
    has_checkbox: true
    unread_responses: 30
    progress:
      -
        sent_to: "32"
        no_excused: "2"
        completed_by: "20"
        marked: "19"
    input:
        -
            id: "input-id"
            value: "Form input"
            name: "input-name"
            maxlength: 15
            checked: false
            type: "checkbox"

requires:
    - ff_module-form-input
    - ff_module-progress
---

## Props

- **`to`**: {String} Required
- **`message`**: {String} Required
- **`linkHref`**: {String} Required
- **`from`**: {String}
- **`fuzzydate`**: {String}
- **`duedate`**: {String}
- **`has_checkbox`**: {Bool}
- **`unread_responses`**: {String}
- **`progress`**: {Object}

    Expects data in the format of the Progress component (ff_module-progress)
- **`input`**: {Object}

    Expects data in the format of the Form Input component (ff_module-form-input)
- **`indicator`**: {Object}
    
    Expects data in the format of the CountIndicator component (ff_module-count-indicator)
- **`modifier`**: {String}
- **`classes`**: {String}
