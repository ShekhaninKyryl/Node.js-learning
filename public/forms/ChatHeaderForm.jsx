import React from 'react'
import {Field, reduxForm} from "redux-form";

function validate(values, props) {
  let errors = {};
  errors.room = 'asd';
  return errors
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
  console.log('ERROR SPAN:', error);
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
    handleSubmit,
    pristine,
    invalid,
    error,
    employees,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <span className='chat-head-left'>
        <Field name="user" component='input' type="hidden"/>
        {/*<Field name='room' component='input' autoComplete='off' autoCorrect="off" list='datalist'/>*/}


        {/*<Field name='id' component='select'>*/}
        {/*<optgroup label="Employees">*/}
        {/*{employees.map(emp => <option className='test' key={emp.id} value={emp.id}>{emp.email}</option>)}*/}
        {/*</optgroup>*/}
        {/*</Field>*/}


        <Field name='room' component={renderField} autoComplete='off' autoCorrect="off" list='datalist'/>
        <datalist id='datalist'>
            {employees.map(emp => <option key={emp.id} value={emp.email}>{emp.email}</option>)}
        </datalist>

      </span>
      <span className='chat-head-right'>
         {error &&
         <span className='error'>{error}</span>}
        <button className='table-button button-save' type='submit' disabled={pristine || invalid}>
          Join
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
