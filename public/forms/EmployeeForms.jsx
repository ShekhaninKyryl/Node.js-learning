import React from 'react'
import {Field, reduxForm} from "redux-form";
import emailValidator from 'email-validator';
import {Link} from "react-router-dom";


function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Must be not empty!';
  }
  if (!values.pay) {
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
  }
  return errors;
}

function renderField(props) {
  let {
    input,
    label,
    disabled,
    type,
    meta: {touched, error}
  } = props;
  let style = '';
  if (error) {
    style = 'error-input'
  }
  return (
    <span>
  {touched &&
  (error && <span className='error'>{error}</span>)
  }
      <input className={style} {...input} placeholder={label} type={type} disabled={disabled}/>
  </span>
  )
}


function EmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
    error,
    initialValues,
    submitSucceeded
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" label={initialValues.name} component={renderField} type="text"/>
      <Field name="pay" label={initialValues.pay} component={renderField} type="text"/>
      <Field name="email" label={initialValues.email} component={renderField} type="text"/>
      <span className='long-span'>
         {/*{submitSucceeded &&*/}
         {/*<span className='error submit-ok'>Done!</span>}*/}
      <button className='table-button button-save' type='submit' disabled={invalid}>Save</button>
      </span>
    </form>
  )
}

function DeleteEmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
    error,
    initialValues
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <span className='long-span'>
      <button className='table-button button-delete' type='submit' disabled={invalid}>Delete</button>
      </span>
    </form>
  )
}

function PutEmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
    reset,
    submitSucceeded,
  } = props;
  {
    submitSucceeded && reset()
  }
  let toDepartmentURL = `/departments`;
  return (
    <form onSubmit={handleSubmit}>
      <div className='table-footer'>
        <hr/>
        <Field name="name" label='Employee name' component={renderField} type="text"/>
        <Field name="pay" label='Payment' component={renderField} type="text"/>
        <Field name="email" label='Email' component={renderField} type="text"/>
        <span>
      <button className='table-button button-save' type='submit' disabled={invalid}>
      Create
      </button>
      </span>
        <span>
      <button className='table-button button-link'>
      <Link to={toDepartmentURL}>Departments</Link>
      </button>
      </span>
        <span style={{display: 'none'}}>
      <Field name="department" component={renderField} type="hidden"/>
      </span>
      </div>
    </form>
  )
}

export {
  EmployeeForm,
  DeleteEmployeeForm,
  PutEmployeeForm,
  validate
}
