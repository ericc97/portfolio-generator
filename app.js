const inquirer = require('inquirer');

// const fs = require('fs');
// const generatePage = require('./src/page-template');

// const pageHTML = generatePage(name, github);


// fs.writeFile('index.html', pageHTML, err => {
//         if (err) throw err;

//         console.log('Portfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
      return inquirer.prompt([
         {
                 type: 'input',
                 name: 'name',
                 message: 'what is your name? (Required)',
                 validate: nameInput => {
                         if (nameInput) {
                                 return true;
                         }else {
                                 console.log('Please enter your name!');
                                 return false;
                         }
                 }
         },
         {
                type: 'input',
                name: 'github',
                message: 'Enter your Github username (Required)',
                validate: githubInput => {
                        if (githubInput) {
                                return true;
                        }else {
                                console.log('Please enter your github username!');
                        }
                }
        },
        {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself (Required)'
        }
 ])
}


const promptProject = portfolioData => {
        // if there is no 'projects' array property, create one
        if (!portfolioData.projects) {
                portfolioData.projects = [];
        }
        console.log(`
======================
 Add a New Project        
======================
`);
        return inquirer.prompt([
                {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of your project?'
                },
                {
                        type: 'input',
                        name: 'description',
                        message: 'Provide a description of the project (required)',
                        validate: descriptionInput => {
                                if (descriptionInput) {
                                        return true;
                                }else {
                                        console.log('Please enter a project description!');
                                }
                        }
                },
                {
                        type: 'checkbox',
                        name: 'languages',
                        message: 'What did you build this project with? (Check all that apply)',
                        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
                },
                {
                        type: 'input',
                        name: 'Link',
                        message: 'Enter the Github link to your project. (Required)',
                        validate: linkInput => {
                                if (linkInput){
                                        return true;
                                }else {
                                        console.log('Please enter a link to the Github  project!');
                                }
                        }
                },
                {
                        type: 'confirm',
                        name: 'feature',
                        message: 'Would you like to feature this project?',
                        default: false
                },
                {
                        type: 'confirm',
                        name: 'confirmAddProject',
                        message: 'Would you like to add another project?',
                        default: false
                }
                
        ])
        .then(projectData => {
                portfolioData.projects.push(projectData);
                if (projectData.confirmAddProject) {
                        return promptProject(portfolioData);
                } else {
                        return portfolioData;
                }
        });

};


 promptUser()
 .then(promptProject)
 .then(portfolioData => {
         console.log(portfolioData);
 });