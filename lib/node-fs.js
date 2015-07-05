var path = require("path"),
    fs = require("fs");

module.exports = {
  resolve: function (filename, fromDirectory) {
    // TODO decide how to do this without being a too restrictive.
    // i.e. can we allow extensibility easily.
    // e.g. a path split by path.delimiter in repl.

    if (path.isAbsolute(filename)) {
      return filename + '.turo';
    }

    if (filename[0] === '.' && fromDirectory) {
      return path.resolve(fromDirectory, filename);
    }

    var paths = this._getPath(),
        i = 0,
        max = paths.length,
        dir, result;
    for (;i<max; i++) {
      dir = paths[i];
      result = this._resolveQuietly(dir, filename);
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

  _resolveQuietly: function (basedir, filename) {
    try {
      return require.resolve(path.join(basedir, filename + '.turo'));
    } catch (e) {
      //console.error(e.toString());
    }
  },

  loadSource: function (filepath, callback) {
    callback(null, fs.readFileSync(filepath).toString());
  }
};