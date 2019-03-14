const asynk = require("./asynk");
const fetch = require("node-fetch");

const getTvChannel = asynk(function*(id) {
  const res = yield fetch(`https://api.jvc.gg/tvChannel/${id}`);
  return yield res.json();
});

getTvChannel(1).then(console.log);
