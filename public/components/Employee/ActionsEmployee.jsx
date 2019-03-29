import axios from 'axios';

class ActionsEmployee {
  //todo axios Employee DONE
  static getEmployees(departmentId) {

    return axios.get(`/api/departments/${departmentId}`)
      .then(response => {
        console.log('Get employees:', response);
        return response.data
      });
  }

  static saveEmployee(employee) {
    let {id, department} = employee;
    return axios.post(`/api/departments/${department}/employee/${id}`, employee)
      .then(response => response.data);

  }

  static putEmployee(employee) {
    let {department} = employee;

    return axios.put(`/api/departments/${department}/employee`, employee)
      .then(response => response.data);

  }

  static removeEmployee(employee) {
    let {id, department} = employee;

    return axios.delete(`/api/departments/${department}/employee/${id}`, {data: employee})
      .then(response => response.data);
  }
}

export default ActionsEmployee
