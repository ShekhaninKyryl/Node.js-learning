var Department = require('./department');
var Emploee = require('./emploee');

var qa = new Department('QA');
var numEmployes = 5;

for (var i = 0; i < numEmployes; i++) {
    new Emploee(i.toString(), qa, i * 100 + 100)
}
//qa.ReculEmploeeDifPay();


//qa.GetMidlePay();

console.log(qa);
console.log(qa.GetFiltredE());