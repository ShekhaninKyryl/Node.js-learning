import React from 'react'
import {Field, reduxForm} from "redux-form";

function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Must be not empty!';
  }
  if (!values.password) {
    errors.password = 'Must be not empty!';
  }
  if (!values.password2) {
    errors.password2 = 'Must be not empty!';
  }
  if (values.password !== values.password2) {
    errors.password2 = 'Passwords not equal!'
  }
  return errors;
}

function renderField(props) {
  let {
    input,
    label,
    type,
    meta: {touched, error}
  } = props;
  let style = '';
  if (error) {
    style = 'error-input'
  }
  return (
    <span>
      {touched && (error && <span className='error'>{error}</span>)}
      <input className={style} {...input} placeholder={label} type={type}/>
    </span>
  );
}

function RegistrationForm(props) {
  const {
    handleSubmit,
    pristine,
    invalid,
    error
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" label='Email' component={renderField} type="text"/>
      <Field name="password" label='Password' component={renderField} type="password"/>
      <Field name="password2" label='Repeat Password' component={renderField} type="password"/>
      <span>
        {error && <span className='error'>{error}</span>}
        <button className='table-button button-link' type='submit' disabled={pristine || invalid}>
          Registration
        </button>
      </span>
    </form>
  )
}

export default reduxForm({
  form: 'registrationForm',
  validate,
})(RegistrationForm)
