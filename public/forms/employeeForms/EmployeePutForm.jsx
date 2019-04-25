import React from "react";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import renderField from "../fieldForm.jsx";
import emailValidator from "email-validator";

function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Must be not empty!';
  }
  if (values.pay === '') {
    errors.pay = 'Must be not empty!';
  } else if (!isFinite(values.pay)) {
    errors.pay = 'Must be number!';
  } else if (values.pay < 0) {
    errors.pay = 'Must be positive!'
  }

  if (!values.email) {
    errors.email = 'Must be not empty!';
  } else if (!emailValidator.validate(values.email)) {
    errors.email = 'Must be email format!';
  } else if (values.email.match(/^#/)) {
    errors.email = 'Dont use "#" at start email!';
  }
  return errors;
}

function PutEmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
    reset,
    submitSucceeded,
    submitting,
    resetEmployees
  } = props;
  {
    submitSucceeded && reset()
  }
  let toDepartmentURL = `/departments`;
  let styleNone = {display: 'none'};

  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error' name="name" label='Employee name' component={renderField} type="text"/>
      <Field errorStyle='error' name="pay" label='Payment' component={renderField} type="text"/>
      <Field errorStyle='error' name="email" label='Email' component={renderField} type="text"/>
      <span>
          <button className='table-button button-save' type='submit' disabled={invalid || submitting}>
            {submitting ? 'Submitting...' : 'Create'}
          </button>
        </span>
      <span>
          <button className='table-button button-link'>
            <Link onClick={()=>resetEmployees()} to={toDepartmentURL}>Departments</Link>
          </button>
        </span>
      <span style={styleNone}>
          <Field name="department" component={renderField} type="hidden"/>
        </span>
    </form>
  )
}

export default reduxForm({
  form: 'empPut',
  validate,
  enableReinitialize: true
})(PutEmployeeForm)
