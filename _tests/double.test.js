import double from '../src/index';

describe('double', () => {
  it('should transfer all props', () => {
    const secretFunction = (a, b) => a + b;
    secretFunction.propTypes = "this is not React";

    const wrapperFunction = (...args) => secretFunction(...args) + 4;

    expect(secretFunction.length).toBe(2);
    expect(wrapperFunction.length).toBe(0);
    expect(wrapperFunction.propTypes).toBe(undefined);

    const result = double(wrapperFunction, secretFunction);

    expect(wrapperFunction.length).toBe(2);
    expect(wrapperFunction.propTypes).toBe("this is not React");
    expect(wrapperFunction).toBe(result);
    expect(wrapperFunction.name).toBe('secretFunction');
    expect(String(wrapperFunction)).toBe(String(secretFunction));

    expect(result(1,2)).toBe(7);
  });

  it('should override toString and name', () => {
    const secretFunction = (a, b) => a + b;
    const wrapperFunction = (a, b) => a + b;

    const result = double(wrapperFunction, secretFunction, {
      name: origin => origin.name+'`s double',
      toString: origin => 'doubled'+origin
    });

    expect(result.name).toBe('secretFunction`s double');
    expect(String(result)).toBe(
      'doubledfunction secretFunction(a, b) {\n' +
      '      return a + b;\n' +
      '    }'
    )
  });

  it('should override toString and name using strings', () => {
    const secretFunction = (a, b) => a + b;
    const wrapperFunction = (a, b) => a + b;

    const result = double(wrapperFunction, secretFunction, {
      name: 'secretFunction`s double',
      toString: origin => 'doubled-code'
    });

    expect(result.name).toBe('secretFunction`s double');
    expect(String(result)).toBe('doubled-code')
  });


  it('should handle IE11 case', () => {
    const secretFunction = (a, b) => a + b;
    const wrapperFunction = () => {};

    Object.defineProperty(wrapperFunction, 'length', {
      configurable: false,
      value: 42
    });

    const result = double(wrapperFunction, secretFunction);

    expect(result).not.toBe(wrapperFunction);
    expect(result.length).toBe(2);
    expect(wrapperFunction.length).toBe(42);
  });
});