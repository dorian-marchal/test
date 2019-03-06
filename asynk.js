function asynk(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      const gen = fn(...args);
      return (function resolvePromises({ value, done }) {
        if (done) {
          return resolve(value);
        }
        return Promise.resolve(value)
          .then(res => resolvePromises(gen.next(res)))
          .catch(reject);
      })(gen.next());
    });
}

module.exports = asynk;
