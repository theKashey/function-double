import utilArity from 'util-arity';

function safeDefine(target, key, descriptor) {
  try {
    Object.defineProperty(target, key, descriptor);
  } catch (e) {
    // nop
  }
}

function transferProperties(source, target) {
  const keys = Object.getOwnPropertyNames(source);

  for (const key of keys) {
    safeDefine(target, key, Object.getOwnPropertyDescriptor(source, key))
  }
}

function double(targetFn, sourceFn, options = {}) {
  let result = targetFn;

  transferProperties(sourceFn, targetFn);

  if (targetFn.length !== sourceFn.length) {
    result = utilArity(sourceFn.length, targetFn);
    transferProperties(result, sourceFn);
  }

  if (options.hasOwnProperty('toString')) {
    safeDefine(result, 'toString', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: function toString() {
        return options.toString(sourceFn)
      },
    });
  } else {
    safeDefine(result, 'toString', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: function toString() {
        return String(sourceFn)
      },
    });
  }

  if (options.hasOwnProperty('name')) {
    safeDefine(result, 'name', {
      configurable: true,
      writable: false,
      enumerable: false,
      value: options.name(sourceFn)
    })
  }

  return result;
}


export default double;