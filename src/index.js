#! /usr/bin/env node

const log = require('gitlog');
const utils = require('./utilities');
const program = require('commander');
const colors = require('colors');

function parsePrefixes(prefixes) {
  return prefixes.split(',');
}

program
  .version('1.0.0')
  .option('-c, --commits <n>', 'Number of commits to analyze', parseInt)
  .option('-p, --prefixes <l>', 'Conventional changelog prefixes used', parsePrefixes)
  .parse(process.argv);

if (program.commits && program.prefixes) {
  log({
    repo: process.cwd(),
    number: program.commits,
    fields: ['authorDate', 'abbrevHash', 'hash', 'subject', 'authorName']
  }, function(error, commits) {
    if (error) return console.log(colors.red(error));

    console.log('Prefixed Commit Counts');
    program.prefixes.map(function(prefix) {
      console.log('-', utils.getCounts(commits, prefix), prefix, 'commits');
    });
    console.log('\n');

    program.prefixes.map(function(prefix) {
      const contributor = utils.getMostFrequentContributor(commits, prefix);
      console.log('Top', prefix, 'Contributor:', contributor);
    });
    console.log('\n');

    program.prefixes.map(function(prefix) {
      const date = utils.getMostFrequentDate(commits, prefix);
      console.log('Top', prefix, 'Commit Date:', date);
    });
  });
} else {
  program.help();
}
