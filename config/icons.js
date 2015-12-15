var path = require( "path" );

module.exports = {
  // CSS filenames
  datasvgcss: "icons.svg.css",
  datapngcss: "icons.png.css",
  urlpngcss: "icons.fallback.css",

  // preview HTML filename
  previewhtml: "preview.html",

  // grunticon loader code snippet filename
  loadersnippet: "grunticon.loader.js",

  // Include loader code for SVG markup embedding
  enhanceSVG: true,

  // Make markup embedding work across domains (if CSS hosted externally)
  corsEmbed: false,

  // folder name (within dest) for png output
  pngfolder: "png",

  // prefix for CSS classnames
  cssprefix: ".",

  defaultWidth: "32px",
  defaultHeight: "32px",

  // define vars that can be used in filenames if desirable,
  // like foo.colors-primary-secondary.svg
  colors: {
    primary: "black",
  },

  dynamicColorOnly: true,

  // css file path prefix
  // this defaults to "/" and will be placed before the "dest" path
  // when stylesheets are loaded. It allows root-relative referencing
  // of the CSS. If you don't want a prefix path, set to to ""
  cssbasepath: "/",

  template: path.join( __dirname, "default-css.hbs" ),
  previewTemplate: path.join( __dirname, "preview-custom.hbs" ),

  compressPNG: true
};
