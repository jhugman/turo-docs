"use strict";

var _ = require("underscore"),
    fs = require("fs");

var files = {
  // we have to be explicit here, to let brfs pick up the files.
  app: fs.readFileSync(__dirname + '/../turo-docs/app.turo'),
  fundamental: fs.readFileSync(__dirname + '/../turo-docs/fundamental.turo'),
  metric: fs.readFileSync(__dirname + '/../turo-docs/metric.turo'),
  imperial: fs.readFileSync(__dirname + '/../turo-docs/imperial.turo'),
  design: fs.readFileSync(__dirname + '/../turo-docs/design.turo'),
  science: fs.readFileSync(__dirname + '/../turo-docs/science.turo'),
  maritime: fs.readFileSync(__dirname + '/../turo-docs/maritime.turo'),
  money: fs.readFileSync(__dirname + '/../turo-docs/money.turo'),
  computerscience: fs.readFileSync(__dirname + '/../turo-docs/computerscience.turo'),
};

module.exports = {
  resolve: function (filename) {
    return files[filename] ? filename : null;
  },

  loadSource: function (filename, callback) {
    callback(null, files[filename]);
  }
};
