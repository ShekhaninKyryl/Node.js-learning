import React from 'react'
import {Field} from "redux-form";

function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Must be not empty!';
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

function DepartmentForms(props) {
  const {
    handleSubmit,
    invalid,
    initialValues,
    submitSucceeded,
    reset
  } = props;

  if (submitSucceeded) {
    setTimeout(() => reset(), 3000);
  }
  let style = submitSucceeded ? 'table-button button-save button-submit-succeeded' : 'table-button button-save';

  return (
    <form onSubmit={handleSubmit}>
      <Field errorStyle='error error-table' name="name" label={initialValues.name} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="employeeCount" disabled={true} component={renderField} type="text"/>
      <Field errorStyle='error error-table' name="averagePayment" disabled={true} component={renderField} type="text"/>
      <span className='short-span'>
        <button className={style} type='submit' disabled={invalid}>
          {submitSucceeded ? 'Done' : 'Save'}
        </button>
      </span>
    </form>
  )
}

function DeleteRowDepartmentForm(props) {
  const {
    handleSubmit,
    invalid,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
        <span className='short-span'>
          <button className='table-button button-delete' type='submit' disabled={invalid}>Delete</button>
        </span>
    </form>
  )
}

function PutDepartmentsForm(props) {
  const {
    handleSubmit,
    invalid,
    reset,
    submitSucceeded
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
        <button className='table-button button-save' type='submit' disabled={invalid}> Create</button>
      </span>
    </form>
  )
}

export {
  DepartmentForms,
  DeleteRowDepartmentForm,
  PutDepartmentsForm,
  validate
}
