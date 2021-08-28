var program = require('commander');
const { prompt } = require('inquirer');
const {
  addcustomer,
  findcustomer,
  updatecustomer,
  deletecustomer,
  allcustomers,
} = require('./index');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Customers name',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customers email',
  },
];

const questionsforupdate = [
  {
    type: 'input',
    name: 'id',
    message: 'Customers id',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Customers name',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Customers email',
  },
];

program.version('1.0.1').description('CRUD CLI');

// program
//   .command('add <name> <email>')
//   .alias('a')
//   .description('Add a customer')
//   .action((name, email) => {
//     addcustomer({ name, email });
//   });

program
  .command('add')
  .alias('a')
  .description('Add a customer')
  .action(() => {
    prompt(questions).then((answers) => addcustomer(answers));
  });

program
  .command('find')
  .alias('f')
  .description('Find a customer')
  .action((id) => {
 prompt(questionsforupdate[0]).then((answer)=>{
    findcustomer(answer.id);
 })  
  });

program
  .command('update')
  .alias('u')
  .description('Update a customer details')
  .action(() => {
    prompt(questionsforupdate).then((answers) => updatecustomer(answers));
  });

program
  .command('delete')
  .alias('d')
  .description('Delete a customer')
  .action(() => {
    prompt(questionsforupdate[0]).then((answer) => deletecustomer(answer));
  });

program
  .command('all')
  .alias('ac')
  .description('All customers')
  .action(() => {
    allcustomers();
  });
program.parse(process.argv);
