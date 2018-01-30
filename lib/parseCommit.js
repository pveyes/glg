module.exports = function parseCommit(commit, separator, dataMap) {
  const dataKeys = Object.keys(dataMap);
  const data = commit.split(separator);

  const changeSet = data[data.length - 1];

  const changes = changeSet
    .trim()
    .split("\n")
    .map(diff => {
      const [type, ...paths] = diff.split("\t");

      if (type === "R100") {
        // rename (100% similarities)
        return {
          type,
          path: paths[1],
          from: paths[0]
        };
      }

      return { type, path: paths[0] };
    });

  const commitData = Object.keys(dataMap).reduce((result, key, index) => {
    result[key] = data[index];
    return result;
  }, {});
  return Object.assign({ changes }, commitData);
};
