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

function fetchUppercase(text) {
  return new Promise(resolve =>
    setTimeout(() => resolve(text.toUpperCase()), 500)
  );
}

const foobar = asynk(function*() {
  try {
    throw new Error("start");
  } catch (err) {
    console.log("bad start");
  }
  let bigFoo;
  let bigBar;
  try {
    bigFoo = yield fetchUppercase("foo");
    bigBar = yield fetchUppercase("bar");
    throw new Error("poule");
  } catch (err) {
    console.log("oof:", err);
  }
  const value = yield "value";
  return [bigFoo, bigBar, value];
});

foobar()
  .then(res => console.log("yay:", res))
  .catch(err => console.log("oops:", err));
