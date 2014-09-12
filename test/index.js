var Store = require('directiv-test-hyper-helpers').Store;
var test = require('directiv-test-helpers').directive;
test('data-hyper', require('../'), {
  'hyper-store': Store(require('./resources'))
}, __dirname);
