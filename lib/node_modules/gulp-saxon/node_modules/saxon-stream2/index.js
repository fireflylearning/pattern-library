var fs = require('fs'),
    exec = require('child_process').exec;
var through2 = require('through2'),
    tmp = require('temporary');

function saxonStream2(jarPath,xslPath,opt){
  var buf = [];
  var timeout = 5000;
  var saxonOpts = ['-warnings:silent'];

  if(opt!==undefined){
    if(opt.timeout!==undefined) timeout = opt.timeout;
    if(opt.saxonOpts!==undefined) saxonOpts = opt.saxonOpts;
  }

  return through2(function(c,e,n){
    buf.push(c+'');
    n();
  },function(n){
    var self = this;
    var data = buf.join('');
    var xml = new tmp.File();
    var result = new tmp.File();
    xml.writeFileSync(data);

    var opts = [
      '-jar',jarPath,
      '-s:'+xml.path,
      '-xsl:'+xslPath,
      '-o:'+result.path
    ];

    // Array.prototype.push.apply(opts,saxonOpts);
    opts = opts.concat(saxonOpts);

    var cmd = exec('java '+opts.join(' '),{timeout:timeout},function(err,stdout,stderr){
      if(err) return n(err);
      if(stderr) return n(stderr);
      if(stdout!==''){
        console.log(stdout);
      }
    });
    
    cmd.on('exit',function(code,sig){
      var cont = fs.readFileSync(result.path);
      self.push(cont);
      result.unlink();
      n();
    });
  });
};

module.exports = saxonStream2;
