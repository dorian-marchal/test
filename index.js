const fetch = require("node-fetch");

const makeGenerator = function*() {
  const res = yield fetch("https://api.jvc.gg/tvChannel/1");
  return res;
};

const gen = makeGenerator();

const { value } = gen.next();
console.log("→ ", value, "\n");

value
  .then(res => res.text())
  .then(text => {
    console.log(gen.next(text));
  });
