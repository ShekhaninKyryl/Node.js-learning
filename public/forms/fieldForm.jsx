import React from "react";

export default function renderField(props) {
  let {
    input,
    label,
    disabled,
    type,
    errorStyle,
    meta: {touched, error}
  } = props;
  let style = '';
  if (error) {
    style = 'error-input'
  }
  return (
    <span>
            {touched && (error && <span className={errorStyle}>{error}</span>)}
      <input className={style} {...input} placeholder={label} type={type} disabled={disabled}/>
    </span>
  )
}
