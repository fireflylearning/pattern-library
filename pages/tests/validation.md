---
page:
    title: Validation variations
    layout: list-blocks
data:
  - ff_container-validation:
    -
        message: "Error: Message"
        modules:
          - "<input type=\"text\"/>"
    -
        message: "Warning: Message"
        active: true
        modifier: "warning"
        modules:
          - "<span class=\"crate_util-block\">Module</span>"
    -
        message: "Valid: Message"
        active: true
        modifier: "valid"
        modules:
          - "<span class=\"crate_util-block\">Module</span>"
    -
        message: "Standalone error: Message"
        active: true
        modifier: "error-standalone"
    -
        message: "Standalone warning: Message"
        active: true
        modifier: "warning-standalone"
    -
        message: "Standalone valid: Message"
        active: true
        modifier: "valid-standalone"
---
