const parseCommit = require("../parseCommit");
const { stripIndent } = require("common-tags");

test("parse commit separated by separator", () => {
  const separator = "####";
  const log = stripIndent`
    87c4fad####fix style parser for encoded quote####Thu Sep 7 14:12:42 2017 +0700####Fri Sep 8 14:02:52 2017 +0700####
  
    M\tlib/style/parser.js
    A\tlib/style/entities.js
  `;

  const commit = parseCommit(log, separator);
  expect(commit).toMatchSnapshot();
});

test("provides `from` for renamed file", () => {
  const separator = "####";
  const log = stripIndent`
    a454fc6####refactor webpack config####Fri Sep 8 22:05:51 2017 +0700####Fri Sep 8 22:08:43 2017 +0700####
  
    R100\tconfig/webpack/desktop.js\tpackages/nodejs-web/config/webpackDesktop.js
    D\twebpack.config.desktop.js
    M\twebpack.config.js
  `;

  const commit = parseCommit(log, separator);
  expect(commit).toMatchSnapshot();
});
