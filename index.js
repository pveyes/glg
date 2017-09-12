const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const parseCommit = require("./lib/parseCommit");

COMMIT_SEPARATOR = "#~#^#";
COMMIT_INFO_SEPARATOR = "^^^";

module.exports = function parseLog(dir, options = {}) {
  const {
    separator = COMMIT_SEPARATOR,
    infoSeparator = COMMIT_INFO_SEPARATOR
  } = options;

  const commitInfo = [
    // commit hash
    "%h",
    // commit message (subject)
    "%s",
    // created date (git commit, start diff/PR)
    "%ad",
    // published date (landed to master)
    "%cd",
    // placeholder for commit changes
    ""
  ].join(infoSeparator);

  return new Promise((resolve, reject) => {
    const command = spawn("git", [
      `--git-dir=${path.resolve(dir)}/.git`,
      "log",
      `--format=${separator}${commitInfo}`,
      "--name-status"
    ]);

    let buffer = "";
    let error = "";
    const history = [];

    command.stderr.on("data", data => {
      error += data.toString();
    });

    command.stdout.on("data", data => {
      // we use buffer in case commit changes is too big
      buffer += data.toString();

      while (buffer.includes(separator)) {
        let [commitData, ...nextBuffer] = buffer.split(separator);

        buffer = nextBuffer.join(separator);

        if (commitData.trim() === "") {
          continue;
        }

        const commit = parseCommit(commitData, infoSeparator);
        history.push(commit);
      }
    });

    command.on("close", code => {
      if (code === 0) {
        resolve(history);
      } else {
        const err = new Error(error);
        err.code = code;
        reject(err);
      }
    });
  });
};
