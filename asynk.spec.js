const asynk = require('./asynk');

describe('asynk', () => {
  it('returns a promise', () => {
    const asyncFn = asynk(function*() {});

    return expect(asyncFn().then).toBeInstanceOf(Function);
  }, 500);

  it('resolves with the return value', () => {
    const asyncFn = asynk(function*() {
      return 'foo';
    });

    return asyncFn().then(res => expect(res).toBe('foo'));
  }, 500);

  it('accepts params', () => {
    const asyncFn = asynk(function*(foo, bar, baz) {
      return [foo, bar, baz];
    });

    return asyncFn('foo', 'bar', 42).then(res =>
      expect(res).toEqual(['foo', 'bar', 42])
    );
  }, 500);

  it('awaits a promise', () => {
    const asyncFn = asynk(function*() {
      const res = yield Promise.resolve('foo');
      return [res];
    });

    return asyncFn().then(res => expect(res).toEqual(['foo']));
  }, 500);

  it('awaits a promise that depend on the result of an other one', () => {
    const asyncFn = asynk(function*() {
      const res = yield Promise.resolve('foo');
      const res2 = yield Promise.resolve(res.toUpperCase());
      return [res, res2];
    });

    return asyncFn().then(res => expect(res).toEqual(['foo', 'FOO']));
  }, 500);

  it('awaits non-promise values', () => {
    const asyncFn = asynk(function*() {
      return [yield 'foo', yield /foo/gm];
    });

    return asyncFn().then(res => expect(res).toEqual(['foo', /foo/gm]));
  }, 500);

  it('rejects when an error is thrown before the first await', () => {
    expect.hasAssertions();
    const error = new Error('foo');
    const asyncFn = asynk(function*() {
      throw error;
    });

    return asyncFn().catch(err => expect(err).toBe(error));
  }, 500);

  it('rejects when an error is thrown after an await', () => {
    expect.hasAssertions();
    const error = new Error('foo');
    const asyncFn = asynk(function*() {
      yield Promise.resolve('foo');
      throw error;
    });

    return asyncFn().catch(err => expect(err).toBe(error));
  }, 500);

  it('rejects when an awaited promise is rejected', () => {
    expect.hasAssertions();
    const error = new Error('foo');
    const asyncFn = asynk(function*() {
      yield Promise.reject(error);
    });

    return asyncFn().catch(err => expect(err).toBe(error));
  }, 500);
});
