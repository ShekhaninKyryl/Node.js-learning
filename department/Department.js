
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
  employe.department = this.name;
  this.employes.push(employe);
  this.totalPay += +employe.pay;
  return this.employes.length;
};

Department.prototype.removeEmploye = function (employe) {
  if (!employe) {
    return;
  }
  this.employes = this.employes.filter(function (value) {
    return !(value.email === employe.email);
  });
  this.totalPay = this.getTotalPay();
};

Department.prototype.editEmploye = function (employe) {
  if (!employe) {
    return;
  }
  employe.department = this.name;
  this.employes = this.employes.map(function (value) {
    if (value.email === employe.email) {
      value = employe;
    }
    return value;
  });
};

function suming (sum, current) {
  return (sum += current.pay);
};

function filterFun (employe) {
  return employe.pay < (this.totalPay / this.employes.length);
};

module.exports = Department;
