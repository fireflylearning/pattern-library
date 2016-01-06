---
data:
    id: "2"
    type: "resource"
    resource_id: "1082"
    title: "My lovely file.pdf"
    mimetype: "application/pdf"
    href: "#"
    classes: "ff_whatever"
    data:
      -
        attr: ff-data-attr
        value: value
---
This module displays a file! Fun huh?

Call with the following xml (example for resources):

```
<attachment id="2" type="resource" resource_id="10383" title="task overview patterns.png" mimetype="image/png" href="resource.aspx?id=10383" classes="ff_other_component_class">
    <data attr="ff-data-attr">Value</data>
</attachment>
```

Call with the following xml (example for pages):

```
<attachment id="3" type="page" page_id="10" title="Pagename" href="resource.aspx?id=10383" classes="ff_other_component_class">
    <data attr="ff-data-attr">Value</data>
</attachment>
```

**ALL attributes and nodes are opitional**  