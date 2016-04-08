---
data:
    items: 
        - 
            title: Recipients
            url: ""
            value: Class 1, Class 2
            previewfor: "input[name='recipients']"
        - 
            title: Details
            url: "test"
            list: 
                - 
                    title: "Title"
                    value: "Volcano formation"
                    previewfor: "input[name='title']"
                - 
                    title: "Due Date"
                    value: "16/05/2016"
        - 
            title: Description
            html: >
                <h2>Volcano formation</h2>
                <p>Volcanoes form when magma reaches the Earth's surface, causing eruptions of lava and ash. They occur at destructive (compressional) and constructive (tensional) plate boundaries.</p>
requires: 
    - ff_module-inline-edit            
---
## React Component

<div data-ff_module-form-preview="" ></div>

## Props 
- **items**: {Array, required} The items to be displayed in the form preview.
  Each item is an object that contains:

   - **title**: {String} The title of the form preview item (e.g. Recipients)
   - **value**: {String} The data for the form preview item
   - **url**: {String} Enables the inline-edit
   - **previewFor**: {String} Specifies what input field the items is a preview of
   - **html**: {Element (html node)} Renders the item as a description. The description can show html.
   - **list**: {Array} Defines a sublist of items within an item. It contains:
      - An Array of Objects with {title: {String}, value: {String}, previewFor: {String} } properties. 
    
### Example of form preview items array
```
items: [{
        title: 'Recipients',
        url: 'test',
        value: 'Class 2, Class 1',
        previewfor: 'input[name="recipients"]',
        key: 1
    },
    {
        title: 'Details',
        url: '',
        list: [{
            title: "Title",
            value: "Volcano formation",
            previewfor: "input[name='title']",
            key: 3
        },
        {
            title: "Due Date",
            value: "16/05/2016",
            key: 4
        }],
        key: 2
    },
    {
        title: 'Description',
        html: <div><h2>Volcano formation</h2></div>
    }]
```

### Flat HTML
```
<div class="ff_module-form-preview">
  <dl class="ff_module-form-preview__list">
    <dt class="ff_module-form-preview__list__title">
     <span class="ff_module-form-preview__list__title__text">Recipients</span>
    </dt>
    <dd class="ff_module-form-preview__list__data" data-ff-preview-for="input[name='recipients']">
      Class 1, Class 2
    </dd>
    <dt class="ff_module-form-preview__list__title">
      <span class="ff_module-form-preview__list__title__text">Details</span>
      <span class="ff_module-form-preview__edit-link">
        <a id="to-do" href="test" class="ff_module-inline-edit">Edit</a>
      </span>
    </dt>
    <dd class="ff_module-form-preview__list__data">
      <dl class="ff_module-form-preview__sublist">
        <dt class="ff_module-form-preview__sublist__title">Title</dt>
        <dd class="ff_module-form-preview__sublist__data" data-ff-preview-for="input[name='title']">
          Volcano formation
        </dd>
        <dt class="ff_module-form-preview__sublist__title">Due Date</dt>
        <dd class="ff_module-form-preview__sublist__data">
          16/05/2016
        </dd>
      </dl>
    </dd>
    <dt class="ff_module-form-preview__list__title">
    <span class="ff_module-form-preview__list__title__text">Description</span>
    </dt>
    <dd class="ff_module-form-preview__list__data">
      <div class="ff_module-form-preview__list__description">
        <h2>Volcano formation</h2>
        <p>Volcanoes form when magma reaches the Earth's surface, 
        causing eruptions of lava and ash. They occur at destructive (compressional) 
        and constructive (tensional) plate boundaries.</p>
      </div>
    </dd>
  </dl>
</div>
```