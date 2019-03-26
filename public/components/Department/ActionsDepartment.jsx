class ActionsDepartment {
  static getDepartments() {
    return fetch('/departments',
      {
        method: 'get',
      })
      .then(res => res.json())
  }

  static saveDepartment(department) {
    let {id, name} = department;
    return fetch(`/departments/${id}/action_save`,
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name}),
      })
      .then(res => res.json());
  }

  static putDepartment(department) {
    let {name} = department;
    return fetch('/departments/action_add',
      {
        method: 'put',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name}),
      })
      .then(res => res.json());
  }

  static removeDepartment(department) {
    let {id, name} = department;
    return fetch(`/departments/${id}/action_remove`,
      {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id, name}),
      })
      .then(res => res.json());
  }
}

export default ActionsDepartment;
