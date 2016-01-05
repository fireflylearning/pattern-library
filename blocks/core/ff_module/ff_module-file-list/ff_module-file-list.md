---
data:
    attachments:
      -
        type: "resource"
        href: "#"
        title: "My lovely file.pdf"
      -
        type: "page"
        href: "#"
        title: "My lovely page"
    classes: "ff_whatever"
    data:
      -
        attr: ff-data-attr
        value: value
requires: 
    - ff_module-file
---

# When you want a list of individual files, each having their own link.

## Call with the following xml (example for resources & pages):

```
<attachments classes="ff_other_component_class">
    <attachment id="2" type="resource" resource_id="10383" title="task overview patterns.png" mimetype="image/png" href="resource.aspx?id=10383" classes="ff_other_component_class">
        <data attr="ff-data-attr">Value</data>
    </attachment>
    <attachment id="3" type="page" page_id="10" title="Pagename" href="resource.aspx?id=10383" classes="ff_other_component_class">
    <data attr="ff-data-attr">Value</data>
</attachment>
    <data attr="ff-data-attr">Value</data>
</attachments>
```

**ALL attributes and nodes are opitional** 