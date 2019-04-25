import React from 'react'
import {Field, reduxForm} from "redux-form";
import renderField from "../fieldForm.jsx";
import emailValidator from 'email-validator';

function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Must be not empty!';
  }
  if (values.pay==='') {
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

function EmployeePostForm(props) {
  let {
    handleSubmit,
    invalid,
    initialValues,
    submitSucceeded,
    submitting,
    reset,
  } = props;

  // if (submitSucceeded) {
  //   setTimeout(() => reset(), 3000);
  // }
  // let style = submitSucceeded ? 'table-button button-save button-submit-succeeded' : 'table-button button-save';

  let style = 'table-button button-save';
  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error error-table' name="name" label={initialValues.name} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="pay" label={initialValues.pay} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="email" label={initialValues.email} component={renderField}
             type="text"/>
      <span className='long-span'>
        <button className={style} type='submit' disabled={invalid || submitting}>
          {submitting ? 'Submitting...' : 'Save'}
        </button>
      </span>
    </form>
  )
}
//todo one component - one file DONE
export default reduxForm({
  validate,
  enableReinitialize: true
})(EmployeePostForm)

