<div data-ff_module-task-event-editor=""></div>

## Props

- **`event`**: {Object} Required
- **`onSend`**: {Function()} Required
- **`onChange`**: {Function(event)} Required
- **`onClose`**: {Function()} Required
- **`models`**: {Object}
- **`validation`**: {Object}
- **`onNext`**: {Function()} 
- **`eventForm`**: {Object}


The component expects (though does not require) a `models` prop. This prop, along with the `validation` prop, are required to activate validation in the form. It expects the following keys which acts as ids for the inputs rendered, and which should contain the path on the object model that defines the input value:

- `mark`: String: value of model reference eg. 'event.description.mark'
- `markMax`: String: value of model reference eg. 'event.description.markMax'
- `grade`: String: value of model reference eg. 'event.description.grade'
- `message`: String: value of model reference eg. 'event.description.message'
- `comment`: String: value of model reference eg. 'event.description.comment'

The `validation` prop follows the same convention as `models` for expected keys.
It contains values that will override the default validation settings in each form template, and should follow the same format.

The `eventForm` prop is passed from the redux state via the react-redux-forms; it's used to determine button state (ie. if the form is valid, the buttons are enabled) but if the value is undefined the buttons default to enabled.
