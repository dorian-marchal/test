const makeGenerator = function*() {
  console.log("before `yield`");

  const foo = yield "bar";

  console.log("after first `yield`.", { foo });

  yield { foo: null };

  console.log("after second `yield`");

  return "quux";
};

const gen = makeGenerator();

console.log("→ ", gen.next(), "\n");
console.log("→ ", gen.next(42), "\n");
console.log("→ ", gen.next(), "\n");
console.log("→ ", gen.next(), "\n");
