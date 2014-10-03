/**
 * Module dependencies
 */

var reduce = require('directiv-core-reduce');

hyperFetch.requires = ['store-hyper'];

/**
 * Expose the 'hyper-fetch' directive
 */

module.exports = hyperFetch;

/**
 * Initialize the hyper-fetch directive
 *
 * @param {StoreHyper} store
 */

function hyperFetch(store) {
  this.compile = function(input) {
    return reduce(input.split(',').map(parseExpression));
  };

  this.state = function(exprs, state) {
    return exprs(function(s, config) {
      if (s === false) return s;

      var res = store.get(config.path, state);
      if (!res.completed) return false;
      return state.set(config.target, res.value);
    }, state);
  };
}

/**
 * .path.to.value
 * path.to.value
 * path.to.value as other
 *
 * @param {String} str
 */

function parseExpression(str) {
  var parts = str.split(' as ');
  var path = parts[0].trim().split('.');
  var target = parts[1];

  return {
    // TODO should we pre-compile a hyper-path?
    path: path,
    target: target ? target.trim() : path[path.length - 1]
  };
}
