'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');
const clone = require('git-clone');
const shell = require('shelljs');

const projects = require('../config/projects');

function init(cmd, opts) {
  console.log('init', opts);
  inquirer
    .prompt([
      /* Pass your questions in here */
      {
        name: 'initType',
        type: 'list',
        message: 'Please select the project type',
        choices: projects.map(item => ({
          name: item.description,
          value: item.name,
        })),
      },
      {
        name: 'name',
        type: 'input',
        message: 'Please enter the project name',
      },
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
      console.log(answers);
      let pwd = shell.pwd();
    })
    .catch(error => {
      if(error.isTtyError) {
        console.log(chalk.red("Prompt couldn't be rendered in the current environment."));
      }
      console.log(error);
    });
}

module.exports = init;