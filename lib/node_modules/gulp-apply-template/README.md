# gulp-apply-template
[![Build Status][travis-img]][travis-url] [![dependencies][david-img]][david-url] [![devDependencies][david-dev-img]][david-url]

> Apply templates to file contents.

For each file in the stream, replace the file's contents by rendering a
template, using the file object as the template's data or context.

Similar to [gulp-wrap](https://www.npmjs.com/package/gulp-wrap), with these
differences:

* Uses [consolidate.js](https://github.com/tj/consolidate.js) to support
  multiple template engines.
* Uses properties from File object itself as template context.


## Usage

Install as a development dependency:

```
npm install --save-dev gulp-apply-template
```

Then, use it in your `gulpfile.js`:

```javascript
var applyTemplate = require('gulp-apply-template');

gulp.task('pages', function () {
  return gulp.src('pages/*.html')
    .pipe(applyTemplate({
      engine: 'swig',
      template: 'templates/layout.tpl'
    })
    .pipe(gulp.dest('dist'));
});
```


## API

`gulp-apply-template` is called with a single options object as an argument.
The available options are:

### engine

Type: `string` or `function(context, file)` **required**

The template engine to use. If a function, it will be called with these
arguments, returning the engine name to use:

  * **context**: The template context

  * **file**: The File object being processed

### template

Type: `string` or `function(context, file)` **required**

The template file path to use. If a function, it will be called with
the same arguments as `engine`, returning the template path.

### context

Type: `object` or `function(file)`

The default template context to use. If a function, it will be called with
one argument, `file`, the File object. Defaults to an empty object. These
will always override properties assigned from the File object.

### props

Type: `array`

Array of names of File object properties to assign to template context,
defaults to `['path', 'contents', 'data']`.


## Examples

Use [gulp-front-matter](https://www.npmjs.com/package/gulp-front-matter)
to dynamically determine template engine and path to use:

```javascript
gulp.src('pages/*.md')
  .pipe(frontMatter({
    property: 'data'
  }))
  .pipe(applyTemplate({
    engine: function (context) {
      return context.data.templateEngine;
    },
    template: function (context) {
      return context.data.templatePath;
    }
  })
  .pipe(gulp.dest('dist'));
```

Ignore Vinyl File properties and use only contents and data provided by
[gulp-data](https://www.npmjs.com/package/gulp-data):

```javascript
gulp.src('pages/*.md')
  .pipe(data(function (file) {
    return require('./properties/' + file.basename + '.json');
  }))
  .pipe(applyTemplate({
    engine: 'swig',
    props: ['contents', 'data'],
    context: function (file) {
      return file.data;
    }
  })
  .pipe(gulp.dest('dist'));
```

[travis-url]: https://travis-ci.org/zaim/gulp-apply-template
[travis-img]: http://img.shields.io/travis/zaim/gulp-apply-template.svg
[david-url]: https://david-dm.org/zaim/gulp-apply-template
[david-img]: https://img.shields.io/david/zaim/gulp-apply-template.svg
[david-dev-img]: https://img.shields.io/david/dev/zaim/gulp-apply-template.svg
