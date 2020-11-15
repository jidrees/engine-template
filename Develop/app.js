const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

// Creating an array of question objects using inquirer


const questionlist=[

                           /////////// NAME ///////////
// Question object 1: Name

{prompt:
            
        {
            type: 'input',
            name: 'name', // this is the name of the variable in which the repsponse is stored
            message: "Please type the {{Position}}'s name",
        },

// Note that this 'for' is important as it is going to help segregate questions that maybe applicable for every poisions vs those that are only applicable to specific position in subsequent functions

 for:'all'
    
    }, // cl br for name prompt
                         /////////// EMAIL///////////

// Question object 2: email

    {prompt:
            
        {
            type: 'input',
            name: 'email', 
            message: "Please type the {{Position}}'s email address",
        },

 for:'all'
    
    }, // cl br for email prompt
                        //////////OFFICE NUMBER for manager //////////

// Question object 3: office number

{prompt:
            
    {
        type: 'input',
        name: 'officeNumber', 
        message: "Please type the Manager's office number",
    },

// I only want this question to display for manager
for:'manager'

}, // cl br for office number prompt

                     /////////////GIT HUB for Software Engineer///////////////

// Question object 4: github username
{prompt:
            
    {
        type: 'input',
        name: 'github', 
        message: "Please type the Engineer's Git-Hub Username",
    },

for:'engineer'

}, // cl br for github username prompt

                //////////// School name for intern /////////////////
// Question object 5: school name
{prompt:
            
    {
        type: 'input',
        name: 'school', 
        message: "Please type the name of the school attended by the intern",
    },

for:'intern'

}, // cl be for email prompt

                ///////// Selecting Employee by their position //////

{prompt:



    // {
    //     type: 'expand',
    //     name: 'position',
    //     message: "Please select the employee's position",
    //     choices: 
    //     [
    //         {key: 'a', value: 'engineer',},
    //         {key: 'b', value: 'intern',},
    //         {key: 'c', value: 'done',},
    
    //     ],
    //   },

    {
        type: "list", 
        message: "Please select the employee's position", 
        name: "position", 
        choices: [
        {name: "Engineer", value: "engineer"},
        {name: "Intern", value: "intern"},
        {name: "I have finished adding employees to the list", value: "done"}
        ]
    
    },               
    
for:'all'
                }, // cl be for position prompt

]; // cl br for the questionlist

// Creating an async await function that does the following

// 1) Extracting data from the question list array of question objects 
// 2) Packaging the extrated data into employe objects specific to position
// 3) Using the switch function to alternate between employee positions
// 4) Pusing employee objects into the employeelist array of employee objects
// 5) Asigning unique ids with increments of 1 for each of the unique employee

async function main(){
    const employeelist=[];
    
    // Setting the default position to 1 and the default position to manager
    let id=1;
    let position='manager';
    

    while (!position==='done'){
     
        // Initiating inquirer prompt, extrating only pertinent question objects from the question list array and then capturing response into a response variable
        const response =await inquirer.prompt(getQuestionsfor(position));
        console.log(response)

        switch(position){
            case 'manager':
                employeelist.push(new Manager(response.name, id, response.email, response.officeNumber));
                break; // the break statement breaks out of a block of code in the switch case


             case 'engineer':
                employeelist.push(new Engineer(response.name, id, response.email, response.github));
                break; 

             case 'engineer':
                 employeelist.push(new intern(response.name, id, response.email, response.school));
                // Note that it is not necessary to break out of the block case
            

            
        } // br close for the swith case

        id++;
        position=response.position



    } // br close for the while loop


}// br close async await function

main()