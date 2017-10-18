async function readJSON(readStream) {
  return new Promise((resolve, reject) => {
    let inputRaw = "";
    readStream.on("data", (chunk) => inputRaw += chunk);
    readStream.on("end", async () => {
      try {
        resolve(JSON.parse(inputRaw));
      } catch (e) {
        reject(e);
      }
    });
  });
}

module.exports = {
  readJSON: readJSON
}