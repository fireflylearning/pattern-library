---
page:
    title: Form radio inputs
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
    ff_module-input-radio-group:
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
            
---
