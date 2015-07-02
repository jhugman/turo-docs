'use strict';

module.exports = (function(){
  var fs = "fs",
      nodeFs = "./lib/node-fs";
  try {
    fs = require(fs);
  } catch (e) {
    fs = undefined;
  }

  if (fs) {
    return require(nodeFs);
  } else {
    return require('./lib/web-fs-static');
  }
})();

