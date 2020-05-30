const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Array containing employee info
const employees = [];

//calls initial function
makeEmployee();

//creates employee html
function makeEmployee() {
// questioms for user
inquirer
  .prompt([
    {
        type: "input",
        message: "What is the team member's name?",
        name: "name"
      },
    {
      type: "input",
      message: "What is the team member's email?",
      name: "email"
    },
    {
      type: "input",
      message: "What is the team member's id?",
      name: "id"
    },
    {
      type: "list",
      message: "Please select the team member's role.",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"]
    },
    {
      type: "input",
      message: "What is the manager's office number?",
      name: "officeNumber",
      when: (employee) => employee.role === "Manager",
     },
     {
      type: "input",
      message: "What is the intern's school name?",
      name: "school",
      when: (employee) => employee.role === "Intern",
     },
     {
      type: "input",
      message: "What is the engineer's github username?",
      name: "github",
      when: (employee) => employee.role === "Engineer",
     }
  ])
  .then(function(employee) {
    // assigns object from promise a Class based on role and pushes into employees array
    if (employee.role === "Intern") {
      employees.push(new Intern(employee.name, employee.id, employee.email, employee.school))
  } else if (employee.role === "Engineer") {
      employees.push(new Engineer(employee.name, employee.id, employee.email, employee.github))
  } else if (employee.role === "Manager") {
      employees.push(new Manager(employee.name, employee.id, employee.email, employee.officeNumber))
  }
   // asks for more employees
    inquirer.prompt([
      {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "choice",
        default: true
      }
    ]).then(function(val) {
      //if yes, repeat function
      if(val.choice) {
        makeEmployee()
      }else {
        // if no, render() to create templates from employees array
        const html = render(employees) 
        // writes team.html from render()
        writeToFile(html)
      }
    })
  });

}
//wriets "team.html" file 
function writeToFile(html) {
    
  fs.writeFile(outputPath, html, function(err) {

      if (err) {
        return console.log(err);
      }
      console.log("Success! team.html created!");
    
    })
};
