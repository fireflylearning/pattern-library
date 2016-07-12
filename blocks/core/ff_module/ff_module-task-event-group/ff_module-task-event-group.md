<div data-ff_module-task-event-group=""/>

# Task Event Groups

This component renders [task events](/blocks/core/ff_module/ff_module-task-event/ff_module-task-event.html) in a grouped format.

## Examples
See [the examples page](/blocks/core/lib_test/lib_test-task-event/lib_test-task-event.html) for a list of task event types with states.


### Props

- **`events`**: {Array}
    
    An array of arrays, each containing Task Event props


#### Example of Events prop
```
[[{   
    description: [event description],
    state: [event state],
    actions: [event actions]
},
{   
    description: [event description],
    state: [event state]
}],
[{   
    description: [event description],
    actions: [event actions]
},
{   
    description: [event description],
    state: [event state],
    actions: [event actions]
}],
[{   
    description: [event description],
    state: [event state],
    actions: [event actions]
}]]
```
