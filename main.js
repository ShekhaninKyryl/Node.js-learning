var Department = require('./department');
var Employe = require('./employe');

var qa = new Department('QA');
var numEmployes = 5;

for (var i = 0; i < numEmployes; i++) {
  qa.addEmploye(new Employe(i.toString(), i * 100 + 100));
}
console.log(qa);
console.log(qa.getFiltredEmployes());
