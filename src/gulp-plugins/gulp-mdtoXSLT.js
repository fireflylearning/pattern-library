'use strict';

var through = require('through2');
var libxslt = require('libxslt'),
    gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    _ = require('lodash'),
    swig = require('swig');

function getDefaultTemplateFileContext(file) {
    return _.merge({}, file.data, {
        path: file.path
    }, {
        cache: false
    });
}

module.exports = function mdtoXSLT(options) {

    if (!options.xslTemplatePath) throw new PluginError('runMdtoXSLT', 'Missing xslTemplateMethod parameter');
    if (!options.xmlTemplatePath) throw new PluginError('runMdtoXSLT', 'Missing xmlTemplateMethod parameter');

    options = _.defaults({}, options, {
        fileContext: getDefaultTemplateFileContext,
        renderer: swig
    }, options);

    var getContext = options.fileContext,
        getXMLPath = options.xmlTemplatePath,
        getXSLPath = options.xslTemplatePath,
        renderer = options.renderer,
        debug = options.debug === true;

    function output(val) {
        if (debug) {
            alwaysOutput(val);
        }
    }
    function alwaysOutput(val){
        console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(val);
        console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~\n');
    }

    return through.obj(function(file, enc, callback) {
        var context = getContext(file);
        var t = this;
        // output(context);
        var templateXMLPath = getXMLPath(file, context);
        var templateXSLPath = getXSLPath(file, context);
        if(debug) gutil.log(templateXMLPath, templateXSLPath);

        var documentString = renderer.renderFile(templateXMLPath, context);
        context.xmlDocumentString = documentString.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
        var stylesheetString = renderer.renderFile(templateXSLPath, context);
        output(documentString);
        output(stylesheetString);

        libxslt.parse(stylesheetString, function(err, stylesheet) {

            if (err) {
                alwaysOutput('\n\n' + stylesheetString);
                t.emit('error', new PluginError({
                    plugin: 'MdtoXSLT',
                    message: 'Error parsing xsl stylesheet: ' + file.path + '; failed with error: ' + err
                }));
                return callback();
            }

            stylesheet.apply(documentString, {}, function(err, result) {

                if (err) {
                    gutil.log(file.path);
                    alwaysOutput('\n\n' + documentString);
                    t.emit('error', new PluginError({
                        plugin: 'MdtoXSLT',
                        message: 'Error applying xsl stylesheet to xml file: ' + file.path + '; failed with error: ' + err
                    }));
                    return callback();
                }


                if (file.isNull() || file.isDirectory()) {
                    t.push(file);
                    return callback();
                }

                if (file.isStream()) {
                    t.emit('error', new PluginError({
                        plugin: 'MdtoXSLT',
                        message: 'Streams are not supported.'
                    }));
                    return callback();
                }

                if (file.isBuffer()) {
                    // output(result);
                    file.contents = new Buffer(result, 'utf-8');
                    t.push(file);
                    return callback();
                }


            });
        });
    });

};
