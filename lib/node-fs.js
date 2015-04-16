var path = require("path"),
    fs = require("fs");

module.exports = {
  resolve: function (filename) {
    // TODO decide how to do this without being a too restrictive.
    // i.e. can we allow extensibility easily.
    // e.g. a path split by path.delimiter in repl.

    var paths = this._getPath(),
        i = 0,
        max = paths.length,
        dir, result;
        filename = filename + ".turo";
    for (;i<max; i++) {
      dir = paths[i];
      result = this._resolveQuietly(path.join(dir, filename));
      if (result) {
        return result;
      }
    }
  },

  _getPath: function () {
    // TODO: calculate this from a command line argument.
    return [
      "../turo-docs/",
      process.cwd()
    ];
  },

  _resolveQuietly: function (modulePath) {
    try {
      return require.resolve(modulePath);
    } catch (e) {
      //console.error(e.toString());
    }
  },

  loadSource: function (filepath, callback) {
    callback(null, fs.readFileSync(filepath).toString());
  }
};