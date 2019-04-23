import React, {Component} from 'react'
import {Field} from "redux-form";
import emailValidator from 'email-validator';
import {Link} from "react-router-dom";

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

function renderField(props) {
  let {
    input,
    label,
    disabled,
    type,
    errorStyle,
    meta: {touched, error}
  } = props;
  let style = '';
  if (error) {
    style = 'error-input'
  }
  return (
    <span>
      {touched && (error && <span className={errorStyle}>{error}</span>)}
      <input className={style} {...input} placeholder={label} type={type} disabled={disabled}/>
    </span>
  )
}

function EmployeeForm(props) {
  let {
    handleSubmit,
    invalid,
    initialValues,
    submitSucceeded,
    reset,
  } = props;
  if (submitSucceeded) {
    setTimeout(() => reset(), 1000);
  }
  let style = submitSucceeded ? 'table-button button-save button-submit-succeeded' : 'table-button button-save';
  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error error-table' name="name" label={initialValues.name} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="pay" label={initialValues.pay} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="email" label={initialValues.email} component={renderField}
             type="text"/>
      <span className='long-span'>
        <button className={style} type='submit' disabled={invalid}>
          {submitSucceeded ? 'Done' : 'Save'}
        </button>
      </span>
    </form>
  )
}

function DeleteEmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
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
  let styleNone = {display: 'none'};

  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error' name="name" label='Employee name' component={renderField} type="text"/>
      <Field errorStyle='error' name="pay" label='Payment' component={renderField} type="text"/>
      <Field errorStyle='error' name="email" label='Email' component={renderField} type="text"/>
      <span>
          <button className='table-button button-save' type='submit' disabled={invalid}>Create</button>
        </span>
      <span>
          <button className='table-button button-link'>
            <Link to={toDepartmentURL}>Departments</Link>
          </button>
        </span>
      <span style={styleNone}>
          <Field name="department" component={renderField} type="hidden"/>
        </span>
    </form>
  )
}

export {
  EmployeeForm,
  DeleteEmployeeForm,
  PutEmployeeForm,
  validate
}
