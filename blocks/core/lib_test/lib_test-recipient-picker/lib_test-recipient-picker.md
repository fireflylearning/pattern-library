---
data:
    modifier: constrained-height
    pickerdataattr: 'data-ff-recipient-picker-test'
    newgroupbtndataattr: 'data-ff-recipient-picker-new-group-button-test'
    tabs:
      -
        active: true
        label: Your Groups        
        content:    "<div data-ff-recipient-list-type=\"your-groups\"/>"
        id: "your-groups"
      -
        active: false
        label: Your Sets
        content:    "<div data-ff-recipient-list-type=\"your-sets\"/>"
        id: "your-sets"
      -
        active: false
        label: All Groups
        content:    "<div data-ff-recipient-list-type=\"all-groups\"/>"
        id: "all-groups"
requires:   
    - ff_container-tabs-content
    - ff_module-tabs-navigation
    - ff_module-profile-picture-and-name-button
    - ff_module-recipient-button-list-static
    - ff_module-recipient-picker-component
    - ff_module-recipient-picker-new-group-button
---
