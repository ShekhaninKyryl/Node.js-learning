import React from 'react'
import {Field, reduxForm} from "redux-form";
import renderField from "../fieldForm.jsx";

function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Must be not empty!';
  }
  return errors;
}

function DepartmentPostForm(props) {
  const {
    handleSubmit,
    invalid,
    initialValues,
    submitSucceeded,
    submitting,
    reset
  } = props;

  // if (submitSucceeded) {
  //   setTimeout(() => reset(), 3000);
  // }
  // let style = submitSucceeded ? 'table-button button-save button-submit-succeeded' : 'table-button button-save';

  let style = 'table-button button-save';

  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error error-table' name="name" label={initialValues.name} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="employeeCount" disabled={true} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="averagePayment" disabled={true} component={renderField} type="text"/>
      <span className='short-span'>
        <button className={style} type='submit' disabled={invalid||submitting}>
          {submitting ? 'Submitting' : 'Save'}
        </button>
      </span>
    </form>
  )
}

export default reduxForm({
  validate,
  enableReinitialize: true
})(DepartmentPostForm)
