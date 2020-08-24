"use strict";

// Package to prompt user to enter inputs
var inquirer = require("inquirer"); // Package to read and write files using node.


var fs = require("fs"); // util is used for node.js internal APIs


var util = require("util"); // Write the readme from user inputs


var writeOutput = util.promisify(fs.writeFile); // Prompt user inputs to populate sections of the readme

function promptUser() {
  return inquirer.prompt([{
    type: "input",
    name: "title",
    message: "Project title"
  }, {
    type: "input",
    name: "description",
    message: "Project description"
  }, {
    type: "input",
    name: "demo",
    message: "Add a link to a demonstration"
  }, {
    type: "input",
    name: "setup",
    message: "How can a user install this application?"
  }, {
    type: "input",
    name: "usage",
    message: "How does a user use this application?"
  }, {
    type: "list",
    message: "Does this application have a license? Select one or 'None' for no license",
    name: "license",
    choices: ["None", "MIT", "Apache", "GNU", "ISC"]
  }, {
    type: "input",
    name: "version",
    message: "Enter the version of the application"
  }, {
    type: "input",
    name: "contributions",
    message: "How can other users contribute to this project"
  }, {
    type: "input",
    name: "tests",
    message: "Please list any tests available."
  }, {
    type: "input",
    name: "github_userid",
    message: "Please enter your Github username"
  }, {
    type: "input",
    name: "github_rp",
    message: "Please enter the name of the repository"
  }, {
    type: "input",
    name: "email",
    message: "Please enter your email address"
  }]);
} // function to generate the content required for the file being created


function readmeGen(userInputs) {
  return "\n  ![Code Count](https://img.shields.io/github/languages/count/".concat(userInputs.github_userid, "/").concat(userInputs.github_rp, ") \n  ![Main Code Base](https://img.shields.io/github/languages/top/").concat(userInputs.github_userid, "/").concat(userInputs.github_rp, ") \n  ![License](https://img.shields.io/badge/license-").concat(userInputs.license, "-blue) \n  ![Version](https://img.shields.io/badge/version-").concat(userInputs.version, "-red) \n  ![Last Commit](https://img.shields.io/github/last-commit/").concat(userInputs.github_userid, "/").concat(userInputs.github_rp, ") \n  ![Open Issues](https://img.shields.io/github/issues-raw/").concat(userInputs.github_userid, "/").concat(userInputs.github_rp, ") \n  ![Repo Size](https://img.shields.io/github/repo-size/").concat(userInputs.github_userid, "/").concat(userInputs.github_rp, ")\n\n  # Welcome to ").concat(userInputs.title, "\n\n\n  ## Table of Contents\n\n  * [Description](#Description)\n  * [Demonstration](#Demonstration)\n  * [Setup](#Setup)\n  * [Usage](#Usage)\n  * [License](#License)\n  * [Contributions](#Contributions)\n  * [Version](#Version)\n  * [Tests](#Tests)\n  * [Questions](#Questions)\n\n\n  ## Description\n\n  ").concat(userInputs.description, "\n\n\n  ## Demonstration\n\n  View a live demonstration [here](").concat(userInputs.demo, ").\n\n  ## Installation\n\n  ").concat(userInputs.setup, "\n\n\n  ## Usage\n\n  ").concat(userInputs.usage, "\n\n\n  ## License\n\n  ![License Badge](https://img.shields.io/badge/license-").concat(userInputs.license, "-blue)\n\n  ").concat(userInputs.license === "None" ? "This application may be used freely without a license." : "You may utilize this application under the terms of the [".concat(userInputs.license, " license](assets/licences/").concat(userInputs.license, ".txt)."), "\n\n  ## Contributions\n\n  ").concat(userInputs.contributions, "\n\n\n\n  ## Version\n\n  ![Version Badge](https://img.shields.io/badge/version-").concat(userInputs.version, "-red)\n\n\n  ## Tests\n\n  ").concat(userInputs.tests, "\n\n  ## Questions\n\n  If you have further questions or would like to see more features, please contact me via github or email:\n\n  https://github.com/").concat(userInputs.github_userid, " \n\n  ").concat(userInputs.email, "\n\n  ");
}

function initialize() {
  var userInputs, readme;
  return regeneratorRuntime.async(function initialize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(promptUser());

        case 3:
          userInputs = _context.sent;
          // the userInputs from above are passed into the readmeGen function which is stored in "readme"
          readme = readmeGen(userInputs); // function pauses whilst writing the file with the content from "readme"

          _context.next = 7;
          return regeneratorRuntime.awrap(writeOutput("output/README.md", readme));

        case 7:
          // notifies the user if successful
          console.log("Successfully wrote to README.md in output folder");
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          // notifies the user if there was an error
          console.log(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

initialize();