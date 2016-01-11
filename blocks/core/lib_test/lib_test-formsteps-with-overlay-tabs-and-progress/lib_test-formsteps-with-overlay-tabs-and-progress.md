---
data:
    picker:
        dataattr: 'data-ff-recipient-picker-test'
    newgroupbtn:
        dataattr: 'data-ff-recipient-picker-new-group-button-test'
    grouptab:
        modifier: constrained-height
        tabs:            
          -
            state: 'is-active'
            label: Your Groups        
            content:    "<div data-ff-recipient-list-type=\"your-groups\"/>"
            id: "your-groups"
          -
            state: ''
            label: Your Sets
            content:    "<div data-ff-recipient-list-type=\"your-sets\"/>"
            id: "your-sets"
          -
            state: ''
            label: All Groups
            content:    "<div data-ff-recipient-list-type=\"all-groups\"/>"
            id: "all-groups"
    formstepheading:
        steps:
          -
            state: "is-current"
            label: "Recipients"
            url: "#"
            id: 'step1'
          -
            state: ""
            label: "Details"
            url: "#"
            id: 'step2'
          -
            state: ""
            label: "Description"
            url: "#"
            id: 'step3'
          -
            state: ""
            label: "Attachments"
            url: "#"
            id: 'step4'
          -
            state: ""
            label: "Preview"
            url: "#"
            id: 'step5'
requires: 
    - ff_module-formsteps 
    - ff_container-formstep-content
    - ff_module-tabs-navigation
    - ff_container-tabs-content
    - ff_container-page-header
    - ff_module-profile-picture-and-name-button
    - ff_module-recipient-button-list-component
    - ff_module-recipient-picker-component
    - ff_module-recipient-picker-new-group-button
---

