
/**
 *
 * @param {string} name
 * @param {Department} department
 * @param {number} pay
 */
var Emploee = function (name = 'NoName', department = null, pay = 0) {
  this.name = name;
  this.pay = pay;
  this.department = department;
  this.differentPay = 0;

  if (department) {
    department.employees.push(this);
    department.ReculEmployeesDifPay();
  }
};

//
Emploee.prototype.GetDifferentPay = function (department = null) {
  if (!this.department && !department) {
    return 0;
  }
  if (!department) {
    department = this.department;
  }
  return this.pay - department.midlePay;
};

module.exports = Emploee;
