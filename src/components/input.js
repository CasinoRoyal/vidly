import React from 'react';

const Input = ({ name, label, value, type, onChange, error }) => {

  return(
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input className="form-control"
             value={value}
             type={type} 
             id={name}
             placeholder={label}
             name={name}
             onChange={onChange} />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  )
}

export default Input;