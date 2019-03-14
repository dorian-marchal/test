const fetch = require("node-fetch");

const getTvChannel = async function(id) {
  const res = await fetch(`https://api.jvc.gg/tvChannel/${id}`);
  return await res.json();
};

getTvChannel(1).then(console.log);
