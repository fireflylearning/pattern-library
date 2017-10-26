'use strict';

import { createFieldClass } from 'react-redux-form';
import _ from 'underscore';
import React from 'react';

function isMulti(model) {
    return /\[\]$/.test(model);
}

function isChecked(props) {
    if (isMulti(props.model)) {
        return (props.modelValue || [])
            .filter((item) =>
                _.isEqual(item, props.value))
            .length;
    }

    return !!props.modelValue;
}

function getValidationProps(props) {
    if (props.validation) {
        return _.clone(props.validation);
    }
    return {};
}

const controlPropsMap = {
    default: (props) => controlPropsMap.text(props),
    checkbox: (props) => ({
        // ...props,
        name: props.model,
        checked: isChecked(props),
    }),
    radio: (props) => ({
        // ...props,
        name: props.model,
        checked: _.isEqual(props.modelValue, props.value),
        value: props.value,
    }),
    select: (props) => ({
        // ...props,
        name: props.model,
        value: props.modelValue,
    }),
    text: (props) => ({
        // ...props,
        value: props.updateOn === 'change' && !props.defaultValue ? props.modelValue : undefined,
        name: props.model,
    }),
    textarea: (props) => controlPropsMap.text(props),
};

const FF_Field = createFieldClass({
    'FormInput': (props) => {

        var controlType = controlPropsMap[props.type] || controlPropsMap['default'],
            controlProps = controlType(props);

        return {
            // ...controlProps,
            value: controlProps.value,
            name: controlProps.name,
            checked: controlProps.checked,
            onChange: props.onChange,
            onBlur: props.onBlur,
            onFocus: props.onFocus,
            onClick: props.onClick,
            onLoad: props.onLoad,
            errors: props.fieldValue && props.fieldValue.errors,
            valid: isValid(props.fieldValue),
            pristine: props.fieldValue.pristine,
            touched: props.fieldValue.touched,
            retouched: props.fieldValue.retouched,
            submitFailed: props.fieldValue.submitFailed,
            focus: props.fieldValue.focus,
            submitted: props.fieldValue.submitted
        };
    },
    'FormLabel': (props) => {
        return {
            valid: isValid(props.fieldValue)
        };
    }
});

function isValid(fieldValue) {
    return fieldValue && fieldValue.valid;
}

export class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'FormField';
    }
    render() {

        if (!this.props.model) return <div className={this.props.className}>{this.props.children}</div>;

        return (
            <FF_Field {...getValidationProps(this.props)} {...this.props}>

            {this.props.children}

            </FF_Field>
        )
    }
}

module.exports = FormField;
