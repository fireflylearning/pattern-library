'use strict';

import { createFieldClass } from 'react-redux-form';

export const FF_Field = createFieldClass({
    'FormInput': (props) => ({
        onChange: props.onChange,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onClick: props.onClick,
        maxLength: props.maxLength
    })
});

module.exports = FF_Field;
