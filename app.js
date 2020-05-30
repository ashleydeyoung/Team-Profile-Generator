const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
makeEmployee();

function makeEmployee() {

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
    
    if (employee.role === "Intern") {
      employees.push(new Intern(employee.name, employee.id, employee.email, employee.school))
  } else if (employee.role === "Engineer") {
      employees.push(new Engineer(employee.name, employee.id, employee.email, employee.github))
  } else if (employee.role === "Manager") {
      employees.push(new Manager(employee.name, employee.id, employee.email, employee.officeNumber))
  }
   
    inquirer.prompt([
      {
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "choice",
        default: true
      }
    ]).then(function(val) {
      if(val.choice) {
        makeEmployee()
      }else {
        console.log(employees)
        const html = render(employees) 
        writeToFile(html)
      }
    })
    // console.log(teammate)
    //store data into "employees" object
    //ask if user wants to add another employee?
    // if yes, re-run inquirer.prompt
    // if no, --- 'render' function
    //store data into an array of object based on role type. 
    
    //render(employees);
    
  });

}

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
function writeToFile(html) {
    
  fs.writeFile(outputPath, html, function(err) {

      if (err) {
        return console.log(err);
      }
    
      console.log("Success! team.html created!");
    
    })
};
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
