"use strict";

var fs = require("fs");

var files = {
  // we have to be explicit here, to let brfs pick up the files.
  app: fs.readFileSync(__dirname + '/../turo-docs/app.turo', 'utf8'),
  fundamental: fs.readFileSync(__dirname + '/../turo-docs/fundamental.turo', 'utf8'),
  metric: fs.readFileSync(__dirname + '/../turo-docs/metric.turo', 'utf8'),
  imperial: fs.readFileSync(__dirname + '/../turo-docs/imperial.turo', 'utf8'),
  design: fs.readFileSync(__dirname + '/../turo-docs/design.turo', 'utf8'),
  science: fs.readFileSync(__dirname + '/../turo-docs/science.turo', 'utf8'),
  computerscience: fs.readFileSync(__dirname + '/../turo-docs/computerscience.turo', 'utf8'),
};

module.exports = {
  resolve: function (filename) {
    return files[filename] ? filename : null;
  },

  loadSource: function (filename, callback) {
    callback(null, files[filename]);
  }
};
