---
data:
    items: 
        - 
            title: "Progress"
            progress:
                 -
                    id: 1
                    classes: "ff_module-other-module-class ff_utils-other-class"
                    sentTo: 23
                    numExcused: 2
                    completedBy: 20
                    marked: 3
        - 
            title: "My Component"
            module: "<span class=\"crate_util-block\">My component</span>"
        - 
            title: "Details"
            url: "test"
            list: 
                - 
                    title: "Title:"
                    value: "Volcano formation"
                    previewfor: "input[name='title']"
                - 
                    title: "Due Date:"
                    value: "16/05/2016"
                -
                    title: "Recipients:"
                    url: ""
                    value: Class 1, Class 2
                    previewfor: "input[name='recipients']"
                -
                    title: "Set By:"
                    url: ""
                    value: "Terry Teacher"
                -
                    title: "Include in Markbook:"
                    url: ""
                    value: "Yes"
        - 
            title: Description
            html: >
                <h2>Volcano formation</h2>
                <p>Volcanoes form when magma reaches the Earth's surface, causing eruptions of lava and ash. They occur at destructive (compressional) and constructive (tensional) plate boundaries.</p>

requires: 
    - ff_module-inline-edit
    - ff_module-progress
         
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
   - **component**: {Element} A react component.
   - **fileList**: {Object} Props for the file list component.
   - **list**: {Array} Defines a sublist of items within an item. It contains:
      - An Array of Objects with {title: {String}, value: {String}, previewFor: {String} } properties. 
    
### Example of form preview items array
```
items: [{
        modifier: 'progress',
        title: 'Progress',
        progress: {
            id: 1,
            classes: "ff_module-other-module-class ff_utils-other-class",
            sentTo: 23,
            numExcused: 2,
            completedBy: 20,
            marked: 3
        },
    },
    {
        modifier: 'controls',
        title: 'My component',
        component: <span className='crate_util-block'>My component</span>
    },
    {
        title: 'Details',
        url: '',
        list: [{
            title: "Title:",
            value: "Volcano formation",
            previewfor: "input[name='title']",
            key: 3
        },
        {
            title: "Due Date:",
            value: "16/05/2016",
            key: 4
        },
        {
            title: 'Recipients:',
            url: 'test',
            value: 'Class 2, Class 1',
            previewfor: 'input[name="recipients"]',
            key: 5
        },
        {
            title: "Set By:",
            value: "Terry Teacher",
            key: 6
        },
        {
            title: "Include in Markbook:",
            value: "Yes",
            key: 7
        }],
        key: 2
    },
    {
        title: 'Task Files',
        fileList: {
            files: [{
                title: 'My lovely file.pdf',
                href: '#'
            }, {
                type: 'page',
                title: 'My lovely page',
                href: '#'
            }]
        }

    },
    {
        modifier: 'description',
        title: 'Description',
        html: <div><h2>Volcano formation</h2> <p>Volcanoes are amazing</p></div>
    }]
```

### Flat HTML
```
<div class="ff_module-form-preview">
    <ul class="ff_module-form-preview__list">
        <li class="ff_module-form-preview__item ff_module-form-preview__item--progress">
            <dl>
                <dt class="ff_module-form-preview__list__title"><span class="ff_module-form-preview__list__title__text">Progress</span></dt>
                <dd class="ff_module-form-preview__list__data">
                    <div class="ff_module-progress ff_module-other-module-class ff_utils-other-class">
                        <div class="ff_module-progress__stacked">
                            <div class="ff_module-progress__bar ff_module-progress__bar--marked " style="width: 13%;" title="13% Marked">
                              <span class="ff_module-progress__meta">13% Marked</span>
                            </div>
                            <div class="ff_module-progress__bar ff_module-progress__bar--completed " style="width: 74%;" title="87% Completed">
                              <span class="ff_module-progress__meta">87% Completed</span>
                            </div>
                        </div>
                        <ul class="ff_module-progress__key">
                            <li class="ff_module-progress__label ff_module-progress__label--marked">
                                <span class="ff_module-progress__label-value">3</span> Marked</li>
                            <li class="ff_module-progress__label ff_module-progress__label--completed">
                                <span class="ff_module-progress__label-value">20</span> Completed</li>
                            <li class="ff_module-progress__label ff_module-progress__label--total">
                                <span class="ff_module-progress__label-value">23</span> Total</li>
                        </ul>
                    </div>
                </dd>
            </dl>
        </li>
        <li class="ff_module-form-preview__item ff_module-form-preview__item--controls">
            <dl>
                <dt class="ff_module-form-preview__list__title"><span class="ff_module-form-preview__list__title__text">My Component</span></dt>
                <dd class="ff_module-form-preview__list__data"><span class="crate_util-block">My component</span>
                </dd>
            </dl>
        </li>
        <li class="">
            <dl>
                <dt class="ff_module-form-preview__list__title">
                  <span class="ff_module-form-preview__list__title__text">Details</span>
                  <span class="ff_module-form-preview__edit-link">
                    <a id="to-do" href="test" class="ff_module-inline-edit">Edit</a>
                    </span>
                </dt>
                <dd class="ff_module-form-preview__list__data">
                    <dl class="ff_module-form-preview__sublist">
                        <dt class="ff_module-form-preview__sublist__title">Title:</dt>
                        <dd class="ff_module-form-preview__sublist__data" data-ff-preview-for="input[name='title']">
                            Volcano formation
                        </dd>
                        <dt class="ff_module-form-preview__sublist__title">Due Date:</dt>
                        <dd class="ff_module-form-preview__sublist__data">
                            16/05/2016
                        </dd>
                        <dt class="ff_module-form-preview__sublist__title">Recipients:</dt>
                        <dd class="ff_module-form-preview__sublist__data" data-ff-preview-for="input[name='recipients']">
                            Class 1, Class 2
                        </dd>
                        <dt class="ff_module-form-preview__sublist__title">Set By:</dt>
                        <dd class="ff_module-form-preview__sublist__data">
                            Terry Teacher
                        </dd>
                        <dt class="ff_module-form-preview__sublist__title">Include in Markbook:</dt>
                        <dd class="ff_module-form-preview__sublist__data">
                            Yes
                        </dd>
                    </dl>
                </dd>
            </dl>
        </li>
        <li class="">
            <dl>
                <dt class="ff_module-form-preview__list__title"><span class="ff_module-form-preview__list__title__text">Description</span></dt>
                <dd class="ff_module-form-preview__list__data">
                    <div class="ff_module-form-preview__list__description">
                        <h2>Volcano formation</h2>
                        <p>Volcanoes form when magma reaches the Earth's surface, causing eruptions 
                        of lava and ash. They occur at destructive (compressional) and constructive (tensional) plate boundaries.</p>
                    </div>
                </dd>
            </dl>
        </li>
    </ul>
</div>
```
