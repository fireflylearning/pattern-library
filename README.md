# Firefly Pattern Library

This repo contains the source files for Firefly front-end development patterns.

// TODO: Complete API
### API 
gulp
    - builds, serves and watches for changes
gulp clean
    - cleans the temporary and output directories
gulp export 
    - build and exports the xsl and css files to `export` directory. The location can be overriden in `config/options.local.js`.
    - 
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
- gulp-jshint for js linting
- css-lint for css linting
- Karma, Mocha, Chai and Sinon for testing
- x for regression testing


