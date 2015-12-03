---
page:
    title: Form radio, checkbox & lists inputs
    layout: list-blocks
data:
  - 
    ff_module-input-radio:
        - 
            label: "Radio input (single, not checked)"
            id: "radio-id-1"
            value: "radio-value-1"
            name: "radio-name-1"
            checked: false    
        - 
            label: "Radio input (single, checked)"
            id: "radio-id-2"
            value: "radio-value-3"
            name: "radio-name-3"
            checked: true
        - 
            label: "Radio input (group, not checked)"
            id: "radio-id-3"
            value: "radio-value-3"
            name: "radio-group-1"
            checked: false    
        - 
            label: "Radio input (group, checked)"
            id: "radio-id-4"
            value: "radio-value-4"
            name: "radio-group-1"
            checked: true
  - 
    ff_module-input-checkbox:
        - 
            label: "Checkbox input (single, not checked)"
            id: "checkbox-id-1"
            value: "checkbox-value-1"
            name: "checkbox-name-1"
            checked: false    
        - 
            label: "Checkbox input (single, checked)"
            id: "checkbox-id-2"
            value: "checkbox-value-3"
            name: "checkbox-name-3"
            checked: true
        - 
            label: "Checkbox input (group, not checked)"
            id: "checkbox-id-3"
            value: "checkbox-value-3"
            name: "checkbox-group-1[]"
            checked: false    
        - 
            label: "Checkbox input (group, checked)"
            id: "checkbox-id-4"
            value: "checkbox-value-4"
            name: "checkbox-group-1[]"
            checked: true

  - 
    ff_module-input-list:
        - 
            modifier: inline
            inputs: 
                - 
                    label: "Radio item 1 (inline)"
                    id: "radio-id-1a"
                    value: "radio-value-1a"
                    name: "radio-list-group-a"
                    checked: false
                - 
                    label: "Radio item 2 (inline)"
                    id: "radio-id-2a"
                    value: "radio-value-2a"
                    name: "radio-list-group-a"
                    checked: false
                - 
                    label: "Radio item 3 (inline)"
                    id: "radio-id-3a"
                    value: "radio-value-3a"
                    name: "radio-list-group-a"
                    checked: true

        - 
            modifier: stacked
            inputs: 
                - 
                    label: "Radio item 1 (stacked)"
                    id: "radio-id-1b"
                    value: "radio-value-1b"
                    name: "radio-list-group-b"
                    checked: false
                - 
                    label: "Radio item 2 (stacked)"
                    id: "radio-id-2b"
                    value: "radio-value-2b"
                    name: "radio-list-group-b"
                    checked: true
                - 
                    label: "Radio item 3 (stacked)"
                    id: "radio-id-3b"
                    value: "radio-value-3b"
                    name: "radio-list-group-b"
                    checked: false
        - 
            modifier: inline
            inputs: 
                - 
                    label: "Checkbox item 1 (inline)"
                    type: checkbox
                    id: "checkbox-id-1a"
                    value: "checkbox-value-1a"
                    name: "checkbox-list-group-a[]"
                    checked: false
                - 
                    label: "Checkbox item 2 (inline)"
                    type: checkbox
                    id: "checkbox-id-2a"
                    value: "checkbox-value-2a"
                    name: "checkbox-list-group-a[]"
                    checked: false
                - 
                    label: "Checkbox item 3 (inline)"
                    type: checkbox
                    id: "checkbox-id-3a"
                    value: "checkbox-value-3a"
                    name: "checkbox-list-group-a[]"
                    checked: true

        - 
            modifier: stacked
            inputs: 
                - 
                    label: "Checkbox item 1 (stacked)"
                    type: checkbox
                    id: "checkbox-id-1b"
                    value: "checkbox-value-1b"
                    name: "checkbox-list-group-b[]"
                    checked: false
                - 
                    label: "Checkbox item 2 (stacked)"
                    type: checkbox
                    id: "checkbox-id-2b"
                    value: "checkbox-value-2b"
                    name: "checkbox-list-group-b[]"
                    checked: true
                - 
                    label: "Checkbox item 3 (stacked)"
                    type: checkbox
                    id: "checkbox-id-3b"
                    value: "checkbox-value-3b"
                    name: "checkbox-list-group-b[]"
                    checked: false
            
---
