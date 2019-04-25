import React from 'react'
import {reduxForm} from "redux-form";

function DeleteDepartmentForm(props) {
  const {
    handleSubmit,
    invalid,
    submitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
        <span className='short-span'>
          <button className='table-button button-delete' type='submit' disabled={invalid || submitting}>
            {submitting ? 'Submitting...' : 'Delete'}
          </button>
        </span>
    </form>
  )
}

export default reduxForm({
    enableReinitialize: true
  }
)(DeleteDepartmentForm)
