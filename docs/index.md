# Firefly Pattern Library

This repo contains the source files for Firefly front-end development patterns.

// TODO: Complete API
### API 
- gulp
    
    builds, serves and watches for changes

- gulp clean

    cleans the temporary and output directories
    
- gulp export 

    build and exports the xsl and css files to `export` directory. The location can be overriden in `config/options.local.js`.

- gulp build
     
    build all resources without serving files.
    
    
## Installation & build
Ensure all dependencies are met, then:

Run the command `npm start` to automatically install, build, serve, and watch development files.

After initial install, the command `gulp` will perform the build, serve, and watching operations.


## Dependencies
- Node
- npm
- Xcode Command Line Tools (for running some modules on Mac, PC should be OK)
- Java for cross-platform XSLT (using Saxon)
    
    OSX on Yosemite+ will need to either install from the apple support page, or install the standard Java runtime, then add 'JAVA_HOME' to paths.

    Follow these [instructions to install](http://osxdaily.com/2014/10/21/get-java-os-x-yosemite/).

    And see this [link for instruction on setting path variables](http://stackoverflow.com/questions/1348842/what-should-i-set-java-home-to-on-osx).

## Technologies used
- Swig for template compilation
- BrowserSync for hot-reloading and syncing
- Webpack for bundling javascript modules
- Less with gulp-less for less > css transpiling
- React Templates for compiling `.rt` templates files (html-like syntax) to `.js`
- gulp-jshint for js linting
- css-lint for css linting
- Karma, Mocha, Chai and Sinon for testing
- x for regression testing // TODO (1)

## Setup

### Blocks
The file structure is based on the BEM (Block Element Modifier) convention.
A directory contains all the patterns(blocks) used within the site, each within their own folder. Inside this folder live all the files relevant to that pattern, such as .html/.xslt/.xml, .less, .js, and any metadata.

    +-- blocks/    
        +-- pattern_name/
            +-- pattern_name.html
            +-- pattern_name.js
            +-- pattern_name.less

#### Styles
In this setup the styles are written in Less, though any css pre-processor could be used.

#### Templates
The templating language here is [Swig](http://paularmstrong.github.io/swig/); each block is written as an xsl file fragment and uses a `.xsl` extension. Areas of variable content are marked by `{{` and `}}` tags and control tags are marked by `{%` and `%}`. See the above link for more documentation.

#### XSL & XSL
##### Conventions
**TBD** 

- Modifier names
- External class names
- xml convention

#### Scripts
Here the scripts are in plain javascript; ideally the component script styles are written in a module format (such as CommonJS) with all dependencies clearly defined and a single export source.

Typically, the core functionality -- whatever will be used directly by Firefly -- is created in a file that matches the directory/module name, eg. `ff_module.js`.

Any script prefixed with an underscore, eg. `_ff_module-*.js` won't be `export`ed.

If the core file requires other services or controls, we can mock them with an underscore prefixed file (`_ff_module-control.js`) to use within the library, and then call each file within a renderer file (`_ff_module-renderer.js`) file that combines required sources, without needlessly being exported to Firefly.

Some modules use React; see below for more information.

#### React
The view templates use [React Templates](https://www.npmjs.com/package/gulp-react-templates) to transform html-like `.rt` files into compiled `.js` files for use in React view logic files.

### Crate
A collection of layout files for presenting these patterns in a variety of ways and with a variety of content. For instance, the developer can view the pattern in the context of all other patterns for comparison purposes; in isolation for development and testing; with a variety of text in different lengths and languages.

## Process
The gulp task will run and traverse the directory, performing the following tasks:

- A web server is started to host and serve all files, enabling accurate representations of cross domain security and file paths, and allowing us to test various load cases with throttling tools.
- Templates are combined with metadata to create HTML pages to display the patterns for development and testing.
- Images and svgs are optimised and output.
- SVG icons are processed, and icon css stylesheets are be built with all required classnames and colour variations. 
- Style files will be:
    - compiled, 
    - auto-prefixed,
    - concatenated, with vendor sources where required,
    - minified, 
    - and output to (a) pre-defined destination(s) if desired.
- Javascript files will be:
    - unit-tested,
    - compiled (where necessary, if using module format or ES6), 
    - linted,
    - concatenated, with vendor sources where required, 
    - minified,
    - and output to (a) pre-defined destination(s) if desired.
- A headless browser session will be started, in order to:
    - perform accessibility testing,
    - test colour contrast ratio,
    - perform regression tests,
    - and perform end-to-end tests.
- Any additional assets such as pre-existing source files are copied to the build folder.


