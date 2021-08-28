const path = require('path');
const fs = require('fs');

module.exports = class Customer {
  constructor(obj) {
    this.id = Math.random() * 1000;
    this.name = obj.name;
    this.email = obj.email;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'data.json'
    );
    let customers = [];
    return new Promise((resolve, reject) => {
      fs.readFile(p, (err, filecontent) => {
        if (!err) {
          customers = JSON.parse(filecontent);
        }
        customers.push(this);
        fs.writeFile(p, JSON.stringify(customers), (err) => {
          if (err) {
            reject();
          } else {
            resolve();
          }
        });
      });
    });
  }

  static fetchall(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'data.json'
    );
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        cb(null);
      } else {
        cb(JSON.parse(filecontent));
      }
    });
  }

  static find(id, cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'data.json'
    );
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        cb(null);
      } else {
        const customer = JSON.parse(filecontent).find((c) => c.id === +id);
        if (!customer) {
          cb(null);
          return;
        }
        // return customer;
        cb(customer);
      }
    });
  }

  static update(obj, cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'data.json'
    );
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        cb(null);
      } else {
        const customers = JSON.parse(filecontent);
        const customer = customers.find((c) => c.id === +obj.id);
        const index = customers.findIndex((c) => c.id === +obj.id);
        if (!customer) {
          cb(null);
          return;
        }
        // return customer;
        customer.name = obj.name;
        customer.email = obj.email;
        customers[index] = customer;
        fs.writeFile(p, JSON.stringify(customers), (err) => {
          if (!err) {
            cb(customer);
          } else {
            console.info('Some error occurred');
          }
        });
      }
    });
  }

  static remove(id, cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'data.json'
    );
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        cb('Some error occurred');
      } else {
        const customer = JSON.parse(filecontent).find((c) => c.id === +id);
        if (!customer) {
          cb('Not found!');
          return;
        }
        const customers = JSON.parse(filecontent).filter((c) => c.id !== +id);
        fs.writeFile(p, JSON.stringify(customers), (err) => {
          if (!err) {
            cb('Deleted!');
          } else cb('Some error occurred');
        });
      }
    });
  }
};
