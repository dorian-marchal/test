const makeGenerator = function*() {
  console.log("before `yield`");

  yield "bar";

  console.log("after first `yield`.");

  yield { foo: null };

  console.log("after second `yield`");

  return "quux";
};

const gen = makeGenerator();

gen.next();
gen.next();
gen.next();
gen.next();
