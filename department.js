/**
 * 
 * @param {string} name 
 */
var Department = function (name = 'NoName') {
    this.name = name;
    this.employees = new Array();
    this.midlePay = this.GetMidlePay();
    this.totalPay = this.GetTotalPay();
};

Department.prototype.GetMidlePay = function () {
    if (!this.employees.length) {
        return 0;
    }
    /**Variant 1 */
    // var sum = 0;
    // for (var i = 0; i < this.employees.length; i++) {
    //     sum += this.employees[i].pay;
    // }
    // this.midlePay = sum / this.employees.length;
    // return this.midlePay;

    /**Variant 2 */
    //return this.midlePay / this.totalPay;

    /**Variant 3 */
    this.GetTotalPay();
    this.midlePay = this.totalPay / this.employees.length;
    return this.midlePay;


}

Department.prototype.GetTotalPay = function () {
    if (!this.employees.length) {
        return 0;
    }

    var Suming = function (sum, current) {
        return sum += current.pay;
    };
    this.totalPay = this.employees.reduce(Suming, 0);
    return this.totalPay;
};

Department.prototype.ReculEmployeesDifPay = function () {
    if (!this.employees.length) {
        return 0;
    }
    this.GetMidlePay();
    this.employees = this.employees.map(function (emploee) {
        emploee.differentPay = emploee.GetDifferentPay();
        return emploee;
    });
};

Department.prototype.GetFiltredE = function (filterFun = null) {
    if (!this.employees.length) {
        return;
    }
    if (!filterFun || typeof filterFun !== 'function') {
        filterFun = function (emploee) {
            return emploee.differentPay < 0;
        }
    }
    return this.employees.filter(filterFun);
};


module.exports = Department;