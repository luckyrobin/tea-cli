#!/usr/bin/env node

'use strict';

const program = require('commander');
const semver = require('semver');
const chalk = require('chalk');

const packageInfo = require('../../package.json');
const commandDefine = require('../config/command');
const run = require('./run');

program
  .version(packageInfo.version)
  .usage('<command> [options]');

// https://github.com/tj/commander.js/pull/260
const proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

function registerCoreCommand() {
  for (let i = 0, len = commandDefine.length; i < len; i += 1) {
    program
      .command(commandDefine[i].name)
      .description(commandDefine[i].description);
  }
}

function main() {
  // check node version
  if (!semver.satisfies(process.version, packageInfo.engines.node)) {
    console.log(chalk.red.bold(`Require nodejs version ${packageInfo.engines.node}, current ${process.version}`));
    console.log(`Download the latest nodejs here ${chalk.green('https://nodejs.org/en/download/')}`);
    process.exit();
  }

  // register some command from package
  registerCoreCommand();

  // parse command
  program.parse(process.argv);

  const task = program.args[0];

  if (!task) {
    program.outputHelp();
    process.exit(0);
  }

  try {
    run(task, program);
    program.parse(process.argv);
  } catch (error) {
    console.log(chalk.red(error));
    process.exit(0);
  }
}

main();
