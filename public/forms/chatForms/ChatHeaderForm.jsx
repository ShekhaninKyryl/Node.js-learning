import React from 'react'
import {Field, reduxForm} from "redux-form";
import emailValidator from 'email-validator';

function validate(values, props) {
  let errors = {};
  if (values.room === undefined) {
    values.room = '';
  }

  if (values.room.match(/^#/)) {
    if (!values.room.match(/^#[a-z\S]+$/)) {
      errors.room = 'Must be without whitespaces';
    }
  } else {
    if (!values.room) {
      errors.room = 'Must be not empty!';
    } else if (!emailValidator.validate(values.room)) {
      errors.room = 'Must be email format!';
    } else if (!props.employees.find(emp => values.room === emp.email ? emp : false)) {
      errors.room = 'Employee not found';
    }
  }
  return errors;

}

function renderField(props) {
  let {
    input,
    label,
    disabled,
    type,
    list,
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
      <input className={style} list={list}  {...input} placeholder={label} type={type} disabled={disabled}/>
    </span>
  )
}

function ChatHeader(props) {
  let {
    invalid,
    error,
    submitSucceeded,
    pristine,

    employees,
    room,

    handleSubmit,
    reset
  } = props;

  // if (submitSucceeded) {
  //   setTimeout(() => reset(), 3000);
  // }
  // let style = submitSucceeded ? 'table-button button-save button-submit-succeeded' : 'table-button button-save';

  let style = 'table-button button-save';

  return (
    <form onSubmit={handleSubmit}>
      <span className='chat-head-left'>
        <Field name="user" component='input' type="hidden"/>
        <Field name='room' component={renderField} label={room} autoComplete='off'
               autoCorrect="off" list='datalist'/>
        <datalist id='datalist'>
          {employees.map(emp => <option key={emp.id} value={emp.email}>{emp.email}</option>)}
        </datalist>
      </span>
      <span className='chat-head-right'>
         {error &&
         <span className='error'>{error}</span>}
        <button className={style} type='submit' disabled={invalid}>
          {submitSucceeded ? 'Done' : 'Join'}
        </button>
      </span>
    </form>
  )
}

export default reduxForm({
  form: 'chatHeader',
  validate,
  enableReinitialize: true
})(ChatHeader)
