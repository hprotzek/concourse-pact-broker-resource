#!/usr/bin/env node

const readJSON = require("./helper").readJSON;
const PactBrokerClient = require("./index");

(async () => {
  const request = await readJSON(process.stdin);
  const source = request.source;
  const version = request.version;

  const client = new PactBrokerClient(source.pact_broker_url);
  let versions = (await client.getVersions(source.pacticipant, !!version ? version.number : undefined)).map(version => ({ number: version }));
  process.stdout.write(`${JSON.stringify(versions, null, 2)}\n`);
})();