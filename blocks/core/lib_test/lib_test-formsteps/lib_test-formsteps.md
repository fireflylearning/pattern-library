---
data:
    modifier: constrained-height
    steps: 
      -
        state: 'is-current'
        label: "Recipients"
        content: "<p class=\"crate_util-block\">Recipients Step</p>"
        id: "tabfs-a"
      -
        state: ''
        label: "Details"
        content: "<p class=\"crate_util-block\">Details Step</p>"
        id: "tabfs-b"
      -
        state: ''
        label: "Description"
        content: "<p class=\"crate_util-block\">Description Step</p>"
        id: "tabfs-c"
      -
        state: ''
        label: "Attachments"
        content: "<p class=\"crate_util-block\">Attachments Step</p>"
        id: "tabfs-d"
requires:   
    - ff_module-formsteps
    - ff_container-formstep-content
---
