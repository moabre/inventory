import React from 'react'
import './Input.scss';



const Input = ({type, label, filled, placeholder, id, handleChange, invalid}) => {
    return (
        <div className="label-input">
            <label htmlFor={label}>{label}</label>
            <input 
            onChange={handleChange} 
            id={id} 
            className={(invalid) ? `inv-input-invalid` : "inv-input"} 
            type={(type) ? type : "text"} 
            defaultValue={(filled) ? filled : ""} 
            placeholder={(placeholder) ? placeholder : ""}/>
        </div>
    )
}

export default Input;
