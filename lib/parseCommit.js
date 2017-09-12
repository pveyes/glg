module.exports = function parseCommit(commit, separator) {
  const [hash, subject, createdDate, publishedDate, changeSet] = commit.split(
    separator
  );

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

  return {
    hash,
    subject,
    createdDate,
    publishedDate,
    changes
  };
};
