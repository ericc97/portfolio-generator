const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

 const {writeFile, copyFile} = require('./utils/generate-site.js');


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
                type: 'confirm',
                name: 'confirmAbout',
                message: 'Would you like to enter some information about yourself for an "About" section?',
                default: true
        },
        {
                type: 'input',
                name: 'about',
                message: 'Provide some information about yourself:',
                when: ({confirmAbout}) => {
                        if(confirmAbout){
                                return true;
                        }else {
                                return false;
                        }
                }
        }
 ])
}


const promptProject = portfolioData => {
  console.log(`
======================
 Add a New Project        
======================
`);
        // if there is no 'projects' array property, create one
        if (!portfolioData.projects) {
                portfolioData.projects = [];
        }
        
        return inquirer
          .prompt([
                {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of your project?',
                        validate: nameInput => {
                                if (nameInput) {
                                        return true;
                                }else {
                                        console.log('You need to enter a project name!');
                                        return false;
                                }
                        }
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
        return generatePage(portfolioData);
 })
 .then(pageHTML => {
         return writeFile(pageHTML);
 })
 .then(writeFileResponse => {
         console.log(writeFileResponse);
         return copyFile();
 })
 .then(copyFileResponse => {
         console.log(copyFileResponse);
 })
 .catch(err => {
         console.log(err);
 });


       