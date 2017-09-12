#!/usr/bin/env node
"use strict";

const meow = require("meow");
const path = require("path");
const fs = require("fs");
const { stripIndent } = require("common-tags");
const glg = require("./");

const cli = meow({
  help: stripIndent`
      Usage: 
        $ glg [<directory> ...]

      Options
        --separator      Provide custom separator between commits
        --infoSeparator  Provide custom separator between commit data
        --output         Save result to json file

      Examples
        $ glg
        $ glg ~/work/web --separator ####
        $ glg --output data.json

      Tips
        By default \`glg\` will use current working directory
    `
});

const dir = cli.input.length > 0 ? cli.input[0] : process.cwd();
const opts = cli.flags;

(async () => {
  let result;

  try {
    result = await glg(dir, opts);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (opts.output) {
    const output = path.resolve(process.cwd(), opts.output);
    fs.writeFileSync(output, JSON.stringify(result));
  } else {
    console.log(result);
  }
})();
