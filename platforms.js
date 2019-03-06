const fetch = require("node-fetch");
const asynk = require("./asynk");

const fetchPlatformNames = asynk(function*() {
  const response = yield fetch("https://api.jvc.gg/platforms");
  const platforms = yield response.json();
  const platformNames = platforms.data.items.map(platform => platform.name);
  return platformNames;
});

fetchPlatformNames().then(console.log);
