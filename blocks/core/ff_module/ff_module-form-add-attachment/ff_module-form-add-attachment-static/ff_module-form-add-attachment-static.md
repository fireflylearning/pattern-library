---
data:
    addattachment: 
        id: 'id-value'
        buttons: 
            -
                text: "Attach file"
                id: add-file
                modifier: block
                classes: "ff_module-form-add-attachment__button" 
                list: 
                    - 
                        href: "#"
                        text: "From computer"   
                    - 
                        href: "#"
                        text: "From existing file" 
                    - 
                        href: "#"
                        text: "From Google docs"
        attachments:
          -
            type: "resource"
            href: "#"
            title: "My lovely file.pdf"
          -
            type: "page"
            href: "#"
            title: "My lovely page"
            
requires:
    - ff_module-button
    - ff_module-dropdown-button
    - ff_module-file
    - ff_module-file-list
---
