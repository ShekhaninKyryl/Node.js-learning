import React from 'react'
import {Field, reduxForm} from "redux-form";

function ChatFooter(props) {
  let {
    handleSubmit,
    pristine,
    invalid,
    error,
    reset,
    submitSucceeded,
  } = props;
  {
    submitSucceeded && reset()
  }
  return (
    <form onSubmit={handleSubmit}>
      <span className='chat-footer-left'>
        <Field name='text' component='input'/>
        <Field name="user" component='input' type="hidden"/>
      </span>
      <span className='chat-footer-right'>
         {error &&
         <span className='error'>{error}</span>}
        <button className='table-button button-save' type='submit' disabled={pristine || invalid}>
          Send
        </button>
      </span>
    </form>
  )
}

export default reduxForm({
  form: 'chatFooter',
  enableReinitialize: true
})(ChatFooter)
