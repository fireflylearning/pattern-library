<div data-ff_container-modal=""></div>


This block is thin wrapper around the `react-modal` [node module](https://github.com/reactjs/react-modal), adding default classNames and generating appropriate classNames for different modifiers. Currently, the node_module is updated directly from the github repo, as the published package is out-of-date with respect to recently added functionality.

## Props
See the docs for [react-modal](https://github.com/reactjs/react-modal) for more info; additionally this wrapper adds:

- **`modifier`**: {String} Suffix class modifier
     
    Current options are `compact` and `wide`
    
- **`classes`**: {String} Additional classes from other block owners

## Methods

- **`getOverlay`**: Returns {Object}; A reference to the modal portal component.
