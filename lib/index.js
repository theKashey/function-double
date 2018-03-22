'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilArity = require('util-arity');

var _utilArity2 = _interopRequireDefault(_utilArity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function safeDefine(target, key, descriptor) {
  try {
    Object.defineProperty(target, key, descriptor);
  } catch (e) {
    // nop
  }
}

function transferProperties(source, target) {
  var keys = Object.getOwnPropertyNames(source);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      safeDefine(target, key, Object.getOwnPropertyDescriptor(source, key));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function double(targetFn, sourceFn) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var result = targetFn;

  transferProperties(sourceFn, targetFn);

  if (targetFn.length !== sourceFn.length) {
    result = (0, _utilArity2.default)(sourceFn.length, targetFn);
    transferProperties(result, sourceFn);
  }

  if (options.hasOwnProperty('toString')) {
    safeDefine(result, 'toString', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: function toString() {
        return options.toString(sourceFn);
      }
    });
  } else {
    safeDefine(result, 'toString', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: function toString() {
        return String(sourceFn);
      }
    });
  }

  if (options.hasOwnProperty('name')) {
    safeDefine(result, 'name', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: options.name(sourceFn)
    });
  }

  return result;
}

exports.default = double;