import React from 'react'
import {Field, reduxForm} from "redux-form";

function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = 'Must be not empty!';
  }
  if (!values.password1) {
    errors.password1 = 'Must be not empty!';
  }
  if (!values.password2) {
    errors.password2 = 'Must be not empty!';
  }

  if(values.password1 !== values.password2){
    errors.password2 = 'Passwords not equal!'
  }
  return errors;
}

const renderField = ({
                       input,
                       label,
                       type,
                       meta: {touched, error}
                     }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched &&
      (error && <span>{error}</span>)}
    </div>
  </div>
);


function RegistrationForm(props) {
  const {
    handleSubmit,
    pristine,
    invalid,
    error
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="email" label='Email' component={renderField} type="text"/>
      </div>
      <div>
        <Field name="password1" label='Password' component={renderField} type="password"/>
      </div>
      <div>
        <Field name="password2" label='Repeat Password' component={renderField} type="password"/>
      </div>
      <div>
        <button type='submit' disabled={pristine || invalid}>
          Registration
        </button>
      </div>
      {error &&
      <div>{error}</div>}
      <hr/>
    </form>
  )
}

export default reduxForm({
  form: 'registrationForm',
  validate,
})(RegistrationForm)
