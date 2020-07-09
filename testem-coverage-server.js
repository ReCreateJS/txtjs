/** eslint-env node */
const path = require("path");
const http = require("http");
const fs = require("fs");
const shell = require("shelljs");

const COVERAGE_SERVER_PORT = 7358;
let server;

function startCoverageServer(callback) {
  const command = "npm run build";
  shell.exec(command, function(code, output) {
    if (code) {
      callback(code, output);
      return;
    }

    // if instrumented successfully
    // start the server
    server = http
      .createServer(function(req, res) {
        console.error(
          "... Received coverage of",
          req.headers["content-length"],
          "length"
        );
        // need separate files per browser/client
        let outputFile = ".nyc_output.json";
        req.pipe(fs.createWriteStream(path.join(__dirname, "tmp", outputFile)));
        // make sure we've got it all
        req.on("end", res.end.bind(res));
      })
      .listen(COVERAGE_SERVER_PORT, function(serverErr) {
        console.error(
          "------ Listening for coverage on " + COVERAGE_SERVER_PORT
        );
        // when server is ready
        // pass control back to testem
        callback(serverErr);
      });
  });
}

function shutdownCoverageServer(callback) {
  // shutdown teh server
  server.close();

  // generate report
  shell.exec("npx nyc report", function(code, output) {
    if (code) return callback(code, output);

    // check on generated report
    const lcov = shell.grep(
      "end_of_record",
      path.join(__dirname, "coverage/lcov.info")
    );
    const report = shell.grep(
      "src/index.html",
      path.join(__dirname, "coverage/lcov-report/index.html")
    );

    if (!lcov || !report) {
      callback(new Error("Unable to generate report"));
      return;
    }

    // everything is good
    callback(null);
  });
}

module.exports = {
  proxies: {
    "/coverage": {
      target: "http://localhost:" + COVERAGE_SERVER_PORT
    }
  },

  startCoverageServer,

  shutdownCoverageServer,

  clientFile: "testem-client-hook.js"
};
