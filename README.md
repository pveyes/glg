# glg [![Build Status](https://travis-ci.org/pveyes/glg.svg)](https://travis-ci.org/pveyes/glg)

[![Greenkeeper badge](https://badges.greenkeeper.io/pveyes/glg.svg)](https://greenkeeper.io/)

> Get parsed git log data easily for analysis

## Install

`glg` needs node version 8.4.0

```sh
$ yarn add glg
# or npm install glg --save
```

## Usage

```js
const glg = require('glg');

(async () => {
  const results: Array<Commit> = await glg(process.cwd());

  // do something
})();

type BasicChange = {
  type: string,
  path: string,
};

type RenameChange = {
  type: string,
  path: string,
  from: string,
};

type Change = BasicChange | RenameChange;

type Commit = {
  hash: string,
  subject: string,
  createdDate: string,
  publishedDate: string,
  changes: Array<Change>,
};
```

## CLI

```sh
$ yarn global add glg
# or npm install -g glg

$ glg ~/git/directory
# or npx glg ~/git/directory
```

## License 

MIT