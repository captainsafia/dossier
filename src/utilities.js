function mostFrequent(array) {
  return array.sort(function(a, b) {
    return array.filter(function(element) {
      return element === a;
    }).length - array.filter(function(element) {
      return element === b;
    }).length
  }).pop();
}

function getCounts(commits, prefix) {
  return commits.filter(function(commit) {
    return commit.subject.toLowerCase().startsWith(prefix.toLowerCase());
  }).length;
}

function getMostFrequentContributor(commits, prefix) {
  const contributors = commits.filter(function(commit) {
    return commit.subject.toLowerCase().startsWith(prefix.toLowerCase());
  }).map(function(commit) {
    return commit.authorName.replace('@end@', '');
  });
  return mostFrequent(contributors);
}

function getMostFrequentDate(commits, prefix) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'];
  const dates = commits.filter(function(commit) {
    return commit.subject.toLowerCase().startsWith(prefix.toLowerCase());
  }).map(function(commit) {
    return new Date(commit.authorDate).getDay();
  });
  return days[mostFrequent(dates)];
}

module.exports = {
  getCounts,
  getMostFrequentContributor,
  getMostFrequentDate
};
