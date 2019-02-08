/**
 *
 * @param {string} name
 */
var Department = function (name = 'NoName') {
  this.name = name;
  this.employes = [];
  this.totalPay = 0;
};

Department.prototype.getMidlePay = function () {
  if (!this.employes.length) {
    return 0;
  }
  return this.getTotalPay() / this.employes.length;
};

Department.prototype.getTotalPay = function () {
  if (!this.employes.length) {
    return 0;
  }
  return this.employes.reduce(suming, 0);
};

Department.prototype.getFiltredEmployes = function () {
  this.midlePay = this.getMidlePay();
  return this.employes.filter(filterFun, this);
};

Department.prototype.addEmploye = function (employe) {
  if (!employe) {
    return;
  }
  this.employes.push(employe);
  this.totalPay = this.getTotalPay();

  return this.employes.length;
};

function suming (sum, current) {
  return (sum += current.pay);
};

function filterFun (employe) {
  return employe.pay < (this.getTotalPay() / this.employes.length);
};

module.exports = Department;
