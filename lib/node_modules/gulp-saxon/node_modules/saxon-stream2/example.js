var fs = require('fs');
var saxon = require('.');

var jarPath = __dirname+'/vendor/saxon9he.jar';
var xmlPath = __dirname+'/test/fixtures/test.xml';
var xslPath = __dirname+'/test/fixtures/test.xsl';

var outputPath = __dirname+'/out.txt';
var xslt = saxon(jarPath,xslPath,{timeout:5000});
xslt.on('error',function(err){
  console.log(err);
});

fs.createReadStream(xmlPath,{encoding:'utf-8'}).pipe(
  xslt
).pipe(fs.createWriteStream(outputPath));

// or
// fs.createReadStream(xmlPath,{encoding:'utf-8'}).pipe(
//   xslt
// ).on('data',function(cont){
//   console.log(cont);
// });

