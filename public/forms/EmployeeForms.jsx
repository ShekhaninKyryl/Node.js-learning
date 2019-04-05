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
  <div>
    <input {...input} placeholder={label} type={type} disabled={disabled}/>
    {touched &&
    (error && <div>{error}</div>)}
  </div>
);


function EmployeeForm(props) {
  const {
    handleSubmit,
    invalid,
    error,
    initialValues
  } = props;
  return (
    <tr onSubmit={handleSubmit}>
      <td>
        <Field name="name" label={initialValues.name} component={renderField} type="text"/>
      </td>
      <td>
        <Field name="pay" label={initialValues.pay} component={renderField} type="text"/>
      </td>
      <td>
        <Field name="email" label={initialValues.pay} component={renderField} type="text"/>
      </td>
      <td>
        <button type='submit' disabled={invalid}>Save</button>
      </td>
    </tr>
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
    <tr onSubmit={handleSubmit}>
        <td>
          <button type='submit' disabled={invalid}>Delete</button>
        </td>
    </tr>
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
    <div onSubmit={handleSubmit}>
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
    </div>
  )
}

export {
  EmployeeForm,
  DeleteEmployeeForm,
  PutEmployeeForm,
  validate
}
