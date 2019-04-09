import React, {Component, PureComponent} from 'react'
import {Field, reduxForm} from "redux-form";

function validate(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'Must be not empty!';
  }
  return errors;
}

function renderField (props){

    let {
      input,
      label,
      disabled,
      type,
      meta: {touched, error}
    } = props;
    return (
      <div>
        <input {...input} placeholder={label} type={type} disabled={disabled}/>
        {touched &&
        (error && <span>{error}</span>)}
      </div>
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
      <div>
        <span>
          <Field name="name" label={initialValues.name} component={renderField} type="text"/>
        </span>
        <span>
          <Field name="averagePayment" disabled={true} component={renderField} type="text"/>
        </span>
        <span>
          <Field name="employeeCount" disabled={true} component={renderField} type="text"/>
        </span>
        <span>
          <button type='submit' disabled={invalid}>Save</button>
        </span>
      </div>
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
        <span>
          <button type='submit' disabled={invalid}>Delete</button>
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

  return (
    <form onSubmit={handleSubmit}>

      <div>
        <span>
          <Field name="name" component={renderField} type="text"/>
        </span>
        <span>
        </span>
        <span>
        </span>
        <span>
          <button type='submit' disabled={invalid}>
            Create
          </button>
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
