import React, {Component, PureComponent} from 'react'
import {Field, reduxForm} from "redux-form";

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
    meta: {touched, error}
  } = props;
  let style = '';
  if (error) {
    style = 'error-input'
  }
  return (
    <span>
            {touched &&
            (error && <span className='error'>{error}</span>)}
      <input className={style} {...input} placeholder={label} type={type} disabled={disabled}/>
    </span>
  )
}


function DepartmentForms(props) {
  const {
    handleSubmit,
    invalid,
    error,
    initialValues
  } = props;
  return (

    <form onSubmit={handleSubmit}>
      <Field name="name" label={initialValues.name} component={renderField} type="text"/>
      <Field name="employeeCount" disabled={true} component={renderField} type="text"/>
      <Field name="averagePayment" disabled={true} component={renderField} type="text"/>
      <span className='short-span'>
          <button className='table-button button-save' type='submit' disabled={invalid}>Save</button>
        </span>

    </form>
  )
}

function DeleteRowDepartmentForm(props) {
  const {
    handleSubmit,
    invalid,
    error,
    initialValues
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
    error,
    reset,
    submitSucceeded
  } = props;
  {
    submitSucceeded && reset()
  }

  let style = {width: '40%'};
  return (
    <form onSubmit={handleSubmit}>
      <div className='table-footer'>
        <hr/>
        <Field name="name" label='Department name' component={renderField} type="text"/>
        <span/>
        <span/>
        <span style={style}>
          <button className='table-button button-save' type='submit' disabled={invalid}> Create</button>
            </span>
      </div>
    </form>
  )
}

export {
  DepartmentForms,
  DeleteRowDepartmentForm,
  PutDepartmentsForm,
  validate
}
