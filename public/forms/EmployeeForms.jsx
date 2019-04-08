import React from 'react'
import {Field, reduxForm} from "redux-form";
import emailValidator from 'email-validator';


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

const renderField = ({
                       input,
                       label,
                       disabled,
                       type,
                       meta: {touched, error}
                     }) => (
  <>
    <input {...input} placeholder={label} type={type} disabled={disabled}/>
    {touched &&
    (error && <div>{error}</div>)}
  </>
);


function EmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
    error,
    initialValues
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="name" label={initialValues.name} component={renderField} type="text"/>
      </div>
      <div>
        <Field name="pay" label={initialValues.pay} component={renderField} type="text"/>
      </div>
      <div>
        <Field name="email" label={initialValues.email} component={renderField} type="text"/>
      </div>
      <div>
        <button type='submit' disabled={invalid}>Save</button>
      </div>
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
        <div>
          <button type='submit' disabled={invalid}>Delete</button>
        </div>
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

  return (
    <form onSubmit={handleSubmit}>
        <div>
          <Field name="name" component={renderField} type="text"/>
        </div>
        <div>
           <Field name="pay" component={renderField} type="text"/>
        </div>
        <div>
           <Field name="email" component={renderField} type="text"/>
        </div>
        <div>
          <button type='submit' disabled={invalid}>
            Create
          </button>
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
