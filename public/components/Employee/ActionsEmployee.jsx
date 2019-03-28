class ActionsEmployee {
  //todo axios
  static getEmployees(departmentId) {
    return fetch(`/api/departments/${departmentId}`,
      {
        method: 'get',
      }).then(res => res.json());
  }
  //todo axios
  static saveEmployee(employee) {
    let {id, name, pay, email, department} = employee;
    return fetch(`/api/departments/${department}/employee/${id}`,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name, pay, email, department}),
      })
      .then(res => res.json());

  }
  //todo axios
  static putEmployee(employee) {
    let {name, pay, email, department} = employee;
    return fetch(`/api/departments/${department}/employee`,
      {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, pay, email, department}),
      })
      .then(res => res.json());

  }
  //todo axios
  static removeEmployee(employee) {
    let {id, name, department} = employee;
    return fetch(`/api/departments/${department}/employee/${id}`,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name}),
      })
      .then(res => res.json());
  }
}

export default ActionsEmployee
