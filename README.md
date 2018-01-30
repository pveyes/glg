# glg

[![Build Status](https://travis-ci.org/pveyes/glg.svg)](https://travis-ci.org/pveyes/glg) [![Greenkeeper badge](https://badges.greenkeeper.io/pveyes/glg.svg)](https://greenkeeper.io/)

> Get parsed git log data easily for analysis

## Install

`glg` needs node >= 6.x.x

```sh
$ yarn add glg
# or npm install glg --save
```

## Usage

This example uses `async/await`, but you can simply use `Promise`.

```js
const glg = require('glg');

(async () => {
  const results: Array<Commit> = await glg(process.cwd());

  // do something
})();
```

By default `glg` will use `#~#^#` as commit separator and `^^^` as commit info separator. If for some reason your commits contain those characters, it will mess up the parsing. You can change it through 2nd arguments

```js
const options = {
  // separator between commits
  separator: 'xxxx',
  // separator between commit information in single commit
  infoSeparator: 'yyyy',
};
const results = await glg(process.cwd(), options)
```

By default `glg` will only provides a few info inside a single commit. You can also provides custom commit data map if you want more information on your git log by using `commitDataMap` option

```js
// These are default commit data map
// It maps object property that will be returned in array of result
// and uses its value to generate data, for example '%h' is used to retrieve
// commit hash. More information can be found in `git log --format`
const commitDataMap = {
  commitHash: "%h",
  authorEmail: "%ae",
  authorName: "%an",
  subject: "%s",
  createdDate: "%ad",
  publishedDate: "%cd"
};
const results = glg(process.cwd(), { commitDataMap });
```

## Type Definition

```js
type Commit = CommitDataMap & {
  changes: Array<Change>,
};

type Change = BasicChange | RenameChange;

type BasicChange = {
  type: string,
  path: string,
};

type RenameChange = {
  type: string,
  path: string,
  from: string,
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
