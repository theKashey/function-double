function-double
=======
[![CircleCI status](https://img.shields.io/circleci/project/github/theKashey/function-double/master.svg?style=flat-square)](https://circleci.com/gh/theKashey/function-double/tree/master) [![Greenkeeper badge](https://badges.greenkeeper.io/theKashey/function-double.svg)](https://greenkeeper.io/)


Stands for the real function passing though all the descriptions and properties of the source function.

It is literally impossible to distinguish the real function, and it's double.

```js
import functionDouble from 'function-double';

const secretFunction = (a,b) => a+b;
secretFunction.propTypes = "this is not React";
const wrapperFunction = (...args) => secretFunction(...args) + 4;

secretFunction.length === 2
wrapperFunction.length === 0
wrapperFunction.propTypes === undefined

const result = functionDouble(wrapperFunction, secretFunction);

wrapperFunction.propTypes === "this is not React";
wrapperFunction.length === 2;


result === wrapperFunction;/ / But not in IE11 :)

```

## API
`functionDouble(targetFunction, sourceFunction, [options])` - moves all the stuff from sourceFunction to target.

- options.toString = (sourceFunction) => string. Override method for `toString`.
- options.name = (sourceFunction) => string. Override method for `name`.

## License

MIT