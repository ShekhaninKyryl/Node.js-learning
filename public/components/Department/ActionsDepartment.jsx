import axios from 'axios';

class ActionsDepartment {
  //todo axios DONE
  static getDepartments() {
    return axios.get('/api/departments')
      .then(response => {
        console.log('Get departments (AXIOS)', response);
        return response.data
      });

  }


//todo app/url DONE
// todo axios DONE
  static saveDepartment(department) {
    let {id, name} = department;
    return axios.post(`/api/departments/${id}`, {id, name})
      .then(response => response.data);
  }


  //todo status code to catch
  //todo axios DONE
  static putDepartment(department) {
    let {name} = department;

    return axios.put('/api/departments', {name})
      .then(response => response.data);

  }

  //todo axios DONE
  static removeDepartment(department) {
    let {id, name} = department;
    return axios.delete(`/api/departments/${id}`, {data: {id, name}})
      .then(response => response.data);
  }
}

export default ActionsDepartment;