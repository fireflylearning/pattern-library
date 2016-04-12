# Firefly Pattern Library

This repo contains the source files for Firefly front-end development patterns.

The primary goal of this pattern library is to enable us to build and test solid html, css, and js/React components. 

It provides us with a separate environment to build and test patterns and their respective css in **isolated units**, with data we have control over so that we can test multiple variations of patterns, their groupings, and how they react to varying things (e.g. differing text lengths, languages, etc). Having each block isolated encourages separation of responsiblities (e.g. containers vs modules) and a modular approach.

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
- Node (Version 4 or greater recommended)
- npm (Version 3 or greater required to ensure correct dependency resolution)
- Xcode Command Line Tools (for running some modules on Mac, PC should be OK)
- Node-libxslt for cross-platform XSLT
    
    See [the Readme for node-libsxlt](https://github.com/albanm/node-libxslt) for more info on enviroment support and dependencies

## Technologies used
- Swig for template compilation
- BrowserSync for hot-reloading and syncing
- Webpack for bundling javascript modules
- Less with gulp-less for less > css transpiling
- React Templates for compiling `.rt` templates files (html-like syntax) to `.js`
- Babel for js(x) transpiling
- gulp-jshint for js linting
- css-lint for css linting
- Karma, Mocha, Chai and Sinon for testing
- x for regression testing // TODO (1)

## Testing
Any files within the directory `/tests` and with the suffix `*.test.js` will be run through the test runner when the command `npm test` is run.

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

### Pages
A collection of layout files for presenting these patterns in a variety of ways and with a variety of content. For instance, the developer can view the pattern in the context of all other patterns for comparison purposes; in isolation for development and testing; with a variety of text in different lengths and languages.

### Icons
Icons are built using [gulp/(grunt)icon](http://www.grunticon.com/) . See [the grunticon docs for full details](https://github.com/filamentgroup/grunticon) of options and methodology.

The `icons` task should (currently) be run separately, and will need to be run after each clean. To optimise the `.svg` icons and build the CSS for each of those icons run:

`gulp icons`

#### Adding new colours 
SVG files are stored in `blocks/[theme]/_icons/original_svgs`. To add another colour to an existing icon files, add a suffix to the file: `filename`**`.colors-[colorname].svg`** where **colorname** is either a hex value or a name defined in `config/icons.js`. Then run the `gulp icons` command to build and output the new svg & fallback files.

#### Exporting icons to the correct svg format
To export icons images to `.svg` format in an optimal way use this script: [svg_exporter](https://github.com/fireflylearning/pattern-library/wiki/svg_exporter)

Save the script as a `.jsx` file. The script is executed in Adobe Illustrator and strips away all the extra code that the default Illustrator export adds to the file.

To run the script:

1. Open Illustrator
2. Select File > Scripts > Other Scripts
3. Select your script
4. Select the folder which contains the files that you want to export as `.svg`
5. Enter the extension of the files that you want to export (e.g. *.ai)
6. Select a folder where you want to save the generated svgs

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

## Common Issues

- node-gyp rebuild errors:
  
    ```
    > node-gyp rebuild

    SOLINK_MODULE(target) Release/.node
    ld: library not found for -lgcc_s.10.5
    clang: error: linker command failed with exit code 1 (use -v to see invocation)
    make: *** [Release/.node] Error 1
    gyp ERR! build error 
    ```
    
    **Resolution:** Usually there is an issue with resolving paths to required `C` libraries. See [this stackoverflow page for an example of the error and solution](http://stackoverflow.com/questions/31936170/npm-the-ld-library-not-found-for-lgcc-s-10-5-on-on-os-x-el-capitain)
- babel dependency errors:
    
    ```
    ERROR in ./blocks/core/ff_module/ff_module-dropdown-button/ff_module-dropdown-button-component/_src/templates/list.jsx
    Module not found: Error: Cannot resolve module 'babel-runtime/helpers/possibleConstructorReturn' in C:\Git-repos\pattern-library\blocks\core\ff_module\ff_module-dropdown-button\ff_module-dropdown-button-component\_src\templates
    ```
    **Resolution:** Babel requires a large amount of interlinked packages and the versions must be internally consistent to be resolved correctly. Unfortunately there are issues with olders version of npm not installing correctly versioned packages. Update npm to resolve this issue.
