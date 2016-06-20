<div data-ff_module-task-response-actions=""></div>

This component renders a collection of buttons that are used in the Task Responses - Teachers screen. A single click handler is passed in, and each button returns a task event with a defined `type` property on that handler.

## Props

- **onClick**: {Func} isRequired
- **state** {Object}:
    + **complete** {Boolean}: 
        + Text will update based on this value
    + **excused** {Boolean}: 
        + Text will update based on this value
    + **userCanEdit** {Boolean}: 
        - if false, will return null.
        - if true, will render Controlbar with buttons.
