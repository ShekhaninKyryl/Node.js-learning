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

// todo disabled when submitting DONE
function PutDepartmentsForm(props) {
  const {
    handleSubmit,
    invalid,
    reset,
    submitSucceeded,
    submitting
  } = props;
  {
    submitSucceeded && reset()
  }
  let style = {width: '40%'};
  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error' name="name" label='Department name' component={renderField} type="text"/>
      <span/>
      <span/>
      <span style={style}>
        <button className='table-button button-save' type='submit' disabled={invalid || submitting}>
          {submitting ? 'Submitting...' : 'Create'}
        </button>
      </span>
    </form>
  )
}

//todo set name from props DONE
export default reduxForm({
  form: 'depPut',
  validate,
  enableReinitialize: true
})(PutDepartmentsForm)
