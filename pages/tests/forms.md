---
page:
    title: Form Lines and their error states
    layout: list-blocks
data:
  - ff_container-form-line:
      -
        errors:
          -
            type: 'empty'
            show: false
            message: 'this is empty you fool!'
          -
            type: 'invalid'
            show: true
            message: 'duh! this was stooopid'
        error_input_id: "uid-1"
        items:
          -
            content: "<label>Please enter your name</label>"  
          -              
            modifier: fullwidth
            content: "<input type='text' class='ff_module-form-input' id='uid-1'/>"
      -
        error_message: "There's a problem with this field."
        error_input_id: "uid-2"
        items:
          -
            content: "<input type='checkbox' class='ff_module-form-input' id='uid-2'/>"  
          -              
            modifier: fullwidth
            content: "<label>Tick this box to fail validation</label>"
---
