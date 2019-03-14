const makeGenerator = function*() {
  console.log("before `yield`");

  yield "bar";

  console.log("after first `yield`.");

  yield { foo: null };

  console.log("after second `yield`");

  return "quux";
};

const gen = makeGenerator();

console.log("→ ", gen.next(), "\n");
console.log("→ ", gen.next(), "\n");
console.log("→ ", gen.next(), "\n");
console.log("→ ", gen.next(), "\n");
