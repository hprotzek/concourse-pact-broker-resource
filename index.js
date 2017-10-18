const fetch = require("node-fetch");
const semver = require("semver");

/**
 * Pact Broker Client that can be used to interact with a running
 * pact broker instance.
 */
class PactBrokerClient extends Object {

  /**
   * @param {string} url 
   */
  constructor(url) {
    super();
    this.url = url;
  }

  /**
   * 
   * @param {string} pacticipant 
   * @param {string=} minVersion 
   * @return {string[]}
   */
  async getVersions(pacticipant, minVersion) {
    const response = await fetch(`${this.url}/pacticipants/${pacticipant}/versions`);
    const json = await response.json()
    let versions = json._embedded.versions.map(versionInfo => versionInfo.number).sort((a, b) => semver.lt(a, b));
    if (!!minVersion) {
      versions = versions.filter(version => semver.lte(minVersion, version));
    }
    return versions;
  }

  async in() {}

  async out() {}

}

module.exports = PactBrokerClient;