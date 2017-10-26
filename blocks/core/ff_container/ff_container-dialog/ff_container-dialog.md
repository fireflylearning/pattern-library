<div data-ff_container-dialog=""></div>

## Props
- **`title`**: {String}, required
- **`body`**: {Node}, required
- **`controls`**: {Node}, required
- **`showCloseIcon`**: {Boolean}
- **`onCloseIconClick`**: {Function}
- **`modifier`**: {String} - current options are `arrow`, `fixed-height`, `compact`

## Structure

### With no top close
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span></h3>
    <div class="ff_container-dialog__body">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls">
        [<button/>,(<button/>)]
    </div>
</div>
```

### With top close
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls">
        <button/>
    </div>
</div>
```

### With arrow modifier
```
<div class="ff_container-dialog ff_container-dialog--arrow">
    <h3 class="ff_container-dialog__heading ff_container-dialog--arrow"><span class="ff_container-dialog__title">Title text</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body ff_container-dialog--arrow">
        <form-line, etc.../>
    </div>
    <div class="ff_container-dialog__controls ff_container-dialog--arrow">
        <button/>
    </div>
</div>
```

### A height constrained dialog for when there is a lot of content
```
<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text - Dialog with 'constrained-height' modifier</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body ff_container-dialog__body--constrained-height">
        <div class="ff_container-dialog__notification">
            <p>This is a height constrained dialog. When there is a lot of content that will make the dialog too deep for the page, the content area will have a max height and a scroll bar will appear.</p>
        </div>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
    </div>
</div>
```

## Raw Examples

<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span></h3>
    <div class="ff_container-dialog__body">
        <p>A simple text message explaining that this will be sent to <em>23 students</em>.</p>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
        <button type="button" title="Button tertiary" class="ff_module-button ff_module-button--tertiary">
            <span class="ff_module-button__content">Cancel</span>
        </button>
    </div>
</div>

<br/>

<div class="ff_container-dialog">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <p>A simple text message explaining that this will be sent to <em>23 students</em>.</p>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
    </div>
</div>

<br/>

<div class="ff_container-dialog ff_container-dialog--arrow">
    <h3 class="ff_container-dialog__heading"><span class="ff_container-dialog__title">Title text - Dialog with arrow modifier</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body">
        <p>A simple text message explaining that this will be sent to <em>23 students</em>.</p>
    </div>
    <div class="ff_container-dialog__controls">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
    </div>
</div>

<br/>

<div class="ff_container-dialog ff_container-dialog--fixed-height">
    <h3 class="ff_container-dialog__heading ff_container-dialog__heading--fixed-height"><span class="ff_container-dialog__title ff_container-dialog__title--fixed-height">Title text - Dialog with 'fixed-height' modifier</span> <button type="button" class="ff_icon ff_icon-cancel-open-darkgrey ff_container-dialog__close-top">Close</button></h3>
    <div class="ff_container-dialog__body ff_container-dialog__body--fixed-height">
        <p>This is a compact dialog. When there is a lot of content that will make the dialog too deep for the page, the content area will have a max height and a scroll bar will appear.</p>
        <p>Cupidatat enim vero, minima eget tristique! Iusto ultricies nascetur odit aliquip magnis, aliquip, penatibus per eveniet montes morbi explicabo! Dolor veritatis eget quas tempor! Accusamus mauris aliqua? Irure. Sociosqu corrupti bibendum occaecati, tristique dolores ea, massa? Excepturi, laboriosam vero tenetur! Senectus voluptas, aperiam hendrerit, animi ad ullam quas, porttitor, accumsan.</p>
        <p>Cupidatat enim vero, minima eget tristique! Iusto ultricies nascetur odit aliquip magnis, aliquip, penatibus per eveniet montes morbi explicabo! Dolor veritatis eget quas tempor! Accusamus mauris aliqua? Irure. Sociosqu corrupti bibendum occaecati, tristique dolores ea, massa? Excepturi, laboriosam vero tenetur! Senectus voluptas, aperiam hendrerit, animi ad ullam quas, porttitor, accumsan.</p>
        <p>Cupidatat enim vero, minima eget tristique! Iusto ultricies nascetur odit aliquip magnis, aliquip, penatibus per eveniet montes morbi explicabo! Dolor veritatis eget quas tempor! Accusamus mauris aliqua? Irure. Sociosqu corrupti bibendum occaecati, tristique dolores ea, massa? Excepturi, laboriosam vero tenetur! Senectus voluptas, aperiam hendrerit, animi ad ullam quas, porttitor, accumsan. Cupidatat enim vero, minima eget tristique! Iusto ultricies nascetur odit aliquip magnis, aliquip, penatibus per eveniet montes morbi explicabo! Dolor veritatis eget quas tempor! Accusamus mauris aliqua? Irure. Sociosqu corrupti bibendum occaecati, tristique dolores ea, massa? Excepturi, laboriosam vero tenetur! Senectus voluptas, aperiam hendrerit, animi ad ullam quas, porttitor, accumsan.</p>
        <p>Cupidatat enim vero, minima eget tristique! Iusto ultricies nascetur odit aliquip magnis, aliquip, penatibus per eveniet montes morbi explicabo! Dolor veritatis eget quas tempor! Accusamus mauris aliqua? Irure. Sociosqu corrupti bibendum occaecati, tristique dolores ea, massa? Excepturi, laboriosam vero tenetur! Senectus voluptas, aperiam hendrerit, animi ad ullam quas, porttitor, accumsan. Cupidatat enim vero, minima eget tristique! Iusto ultricies nascetur odit aliquip magnis, aliquip, penatibus per eveniet montes morbi explicabo! Dolor veritatis eget quas tempor! Accusamus mauris aliqua? Irure. Sociosqu corrupti bibendum occaecati, tristique dolores ea, massa? Excepturi, laboriosam vero tenetur! Senectus voluptas, aperiam hendrerit, animi ad ullam quas, porttitor, accumsan.</p>
    </div>
    <div class="ff_container-dialog__controls ff_container-dialog__controls--fixed-height">
        <button type="button" title="Button primary" class="ff_module-button ff_module-button--primary">
            <span class="ff_module-button__content">Send</span>
        </button>
    </div>
</div>
