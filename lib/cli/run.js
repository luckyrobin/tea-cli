'use strict';

const chalk = require('chalk');

function run(task, program) {
  const plugin = program.command(task);
  plugin.action((_cmd, _opts) => {
    let cmd = _cmd;
    let opts = _opts;
    try {
      const exec = require(`../packages/${task}`);
      exec(cmd, opts);
    } catch(errorStack) {
      console.log(chalk.red('Exception occurred when reading plugin information.'));
      console.log(errorStack);
    }
  });
}

module.exports = run;