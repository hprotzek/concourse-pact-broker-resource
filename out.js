#!/usr/bin/env node

const readJSON = require("./helper").readJSON;

(async () => {
  const request = await readJSON(process.stdin);

  var response = {};
  response.version = request.version;

  process.stdout.write(`${JSON.stringify(response, null, 2)}\n`);
})();