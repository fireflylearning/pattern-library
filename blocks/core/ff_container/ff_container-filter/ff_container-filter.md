---
data:
   label: "Sort by"
   modifier: "fixed-height"
   clear_filters_button: 
            - 
                text: "Clear All"
                modifier: "link"
   sets:
    -
      modules:
        - "<span class=\"crate_util-block\">Module A</span>"
        - "<span class=\"crate_util-block\">Module B</span>"
        - "<span class=\"crate_util-block\">Module C</span>"
requires: 
    - ff_module-button
---

## React Component

<div data-ff_container-filter="" />

## Props 
- **label**: {String, required} The label for the filters
- **modifier**: {String} Modifier for the main container (currently supported modifier: fixed-height)
- **clearFiltersButton**: {Object} Props for the button component
- **filters**: {Array, required} The items to be displayed inside the filter container. Each item is an object that contains:
   - **content**: {element, required} The content of the filter
  