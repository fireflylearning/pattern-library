## gulp-saxon

xslt by saxon plugin for gulp

## Install

    npm install gulp-saxon

## Usage

```js
var fs = require('fs'),
    gulp = require('gulp');

var saxon = require('gulp-saxon');

gulp.task('run',function(){
  var xml = [__dirname,'test.xml'].join('/');
  var out = [__dirname,'out'].join('/');

  return gulp.src(xml).pipe(saxon({
    jarPath: [__dirname,'vendor','saxon9he.jar'].join('/'),
    xslPath: [__dirname,'xsl','test.xsl'].join('/'),
    outputType: '.txt',
    timeout: 5000
  })).pipe(gulp.dest(out))
});
```
