/**
 *
 * @param {string} name
 * @param {number} pay
 */
var Employe = function (name = 'NoName', pay = 0, email = `${name}@domain.com`) {
  this.name = name;
  this.pay = pay;
  this.department = 'NoName';
  this.email = email;
};

module.exports = Employe;
