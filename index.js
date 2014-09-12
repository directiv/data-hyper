/** @directiv data-stateless */

exports.requires = ['hyper-store'];

exports.exposes = [
  'data-hyper',
  'data-fetch'
];

exports.compile = function(input, props) {
  // TODO support 'as' syntax
  // TODO support multiple expressions
  var path = input.split('.');
  return {
    path: input,
    target: path[path.length - 1]
  };
};

exports.state = function(config, state) {
  var res = this('hyper-store').get(config.path, state.get());
  if (!res.completed) return false;
  return state.set(config.target, res.value);
};
