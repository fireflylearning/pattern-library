var should = require('should'),
    fs = require('fs');
var saxon = require('../');

describe('saxon',function(){
  var jarPath = __dirname+'/../vendor/saxon9he.jar';
  var xml = __dirname+'/fixtures/test.xml';
  var invalid_xml = __dirname+'/fixtures/error.xml';
  var xsl = __dirname+'/fixtures/test.xsl';
  var inf_xsl = __dirname+'/fixtures/inf.xsl';

  it('should be transform stream',function(done){
    var xslt = saxon(jarPath,xsl);
    xslt.should.have.property('_transformState');
    done();
  });

  it('should be able to convert with xsl',function(done){
    var xslt = saxon(jarPath,xsl);
    fs.createReadStream(xml).pipe(xslt).on('data',function(d){
      d.should.be.a.Buffer;
      d.toString().should.be.equal('my name');
      done();
    });
  });

  it('should throw error',function(done){
    var xslt = saxon(jarPath,xsl);
    xslt.on('error',function(err){
      done();
    });
    fs.createReadStream(invalid_xml).pipe(xslt);
    xslt.should.throw();
  });

  it('should throw timeout error',function(done){
    var xslt = saxon(jarPath,inf_xsl,{timeout:2000});
    xslt.on('error',function(err){
      err.code.should.be.equal(143);
      done();
    });
    fs.createReadStream(xml).pipe(xslt);
    xslt.should.throw();
  });

});
