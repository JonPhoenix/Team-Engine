const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const myTeam = [];

function managerInfo() {
    console.log("Please build your team:");
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?",
            validate: function (answer) {
                if (answer !== '') {
                    return true;
                }
                return 'Enter at least one character.';
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID?",
            validate: function (answer) {
                const valid = answer.match(/^[1-9]\d*$/);
                if (valid) {
                    return true;
                }
                return 'Enter a number greater than 0.';
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            validate: function (answer) {
                const valid = answer.match(/\S+@\S+\.\S+/);
                if (valid) {
                    return true;
                }
                return 'Enter a valid email address';
            },
        },
        {
            type: "input",
            name: "number",
            message: "What is your manager's office number?",
            validate: function (answer) {
                const valid = answer.match(/^[1-9]\d*$/);
                if (valid) {
                    return true;
                }
                return 'Enter a number greater than 0.';
            },
        },
    ]).then(function(answers) {
        let manager = new Manager(
            answers.name, 
            answers.id, 
            answers.email, 
            answers.number)
        myTeam.push(manager);
        addEmployee();
    })
};

function addEmployee () {
    inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer", 
                "Intern", 
                "My team is complete!"
            ],
        },
    ]).then(function(newEmployee) {
        if (newEmployee.name === "Engineer") {
            engineerInfo();
        }
        else if (newEmployee.name === "Intern") {
            internInfo();
        }
        else if (newEmployee.name === "My team is complete!") {
            createHTML (outputPath, render(myTeam));
        };
    });
};

function engineerInfo() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?",
            validate: function (answer) {
                if (answer !== '') {
                    return true;
                }
                return 'Enter at least one character.';
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID?",
            validate: function (answer) {
                const valid = answer.match(/^[1-9]\d*$/);
                if (valid) {
                    return true;
                }
                return 'Enter a number greater than 0.';
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?",
            validate: function (answer) {
                const valid = answer.match(/\S+@\S+\.\S+/);
                if (valid) {
                    return true;
                }
                return 'Enter a valid email address';
            },
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's Github username?",
            validate: function (answer) {
                if (answer !== '') {
                    return true;
                }
                return 'Enter at least one character.';
            },
        },
    ]).then(function(answers) {
        let engineer = new Engineer(
            answers.name, 
            answers.id, 
            answers.email, 
            answers.github)
        myTeam.push(engineer);
        addEmployee();
    });
};

function internInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "name",
            validate: function (answer) {
                if (answer !== '') {
                    return true;
                }
                return 'Enter at least one character.';
            },
        },
        {
            type: "input",
            message: "What is your intern's ID?",
            name: "id",
            validate: function (answer) {
                const valid = answer.match(/^[1-9]\d*$/);
                if (valid) {
                    return true;
                }
                return 'Enter a number greater than 0.';
            },
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "email",
            validate: function (answer) {
                const valid = answer.match(/\S+@\S+\.\S+/);
                if (valid) {
                    return true;
                }
                return 'Enter a valid email address';
            },
        },
        {
            type: "input",
            message: "What is your intern's school?",
            name: "school",
            validate: function (answer) {
                if (answer !== '') {
                    return true;
                }
                return 'Enter at least one character.';
            },
        },
    ]).then(function(answers) {
        let intern = new Intern(
            answers.name, 
            answers.id, 
            answers.email, 
            answers.school)
        myTeam.push(intern);
        addEmployee();
    });
};

function createHTML(fileName, data) {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Success!");
    });
};

managerInfo();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
