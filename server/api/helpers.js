const _ = require('lodash');

const _snakeKeys = key => {
	return _.snakeCase(key);
};

const _prepValueAccessors = val => {
	return '${' + val + '}';
};

module.exports = {
	_snakeKeys,
	_prepValueAccessors
};
