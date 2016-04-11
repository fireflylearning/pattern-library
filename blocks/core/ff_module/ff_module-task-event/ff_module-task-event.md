<div data-ff_module-task-event=""/>



# Task event

This component renders a task event with different formats depending on the `type` property of the object passed to it.

**Refer to `[firefly-webapp]/front-end/lib/task-responses/events.js` for the most up-to-date listing of Event types that Firefly expects.**


## Event Types with styling and tests
- `comment`
- `set-task` 
- `stamp-response-as-seen`
- `confirm-student-is-excused`
- `confirm-student-is-unexcused`
- `confirm-task-is-complete`
- `request-resubmission`
- `delete-response`
- `add-file`

### Props
#### Shared
- `type`: String, eg: `'set-task'`
- `sent`: String, eg: `'20:40'` or `'Mon 7 Dec, 18:45'`
- `author`: Object, eg `{ name: 'Terry Teacher '}`

#### Examples of Event objects
```
{   
    type: 'added-comment', 
    sent: 'Mon 7 Dec, 18:45', 
    author: { name: 'Sally Student' }, 
    message: 'Much better, this sets the essay up very well. Very good character analysis, you understand the different perspectives and explained the context very thoroughly. Keep up the good work!' 
}
```
