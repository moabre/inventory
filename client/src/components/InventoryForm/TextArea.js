import React from 'react'
import './TextArea.scss';

const TextArea = ({label, name, filled, placeholder, invalid}) => {
    return (
        <div className="label-input">
            <label htmlFor={label}>{label}</label>
            <textarea className={(invalid) ? "inv-input-invalid" : "inv-input"} name={name} id={name} placeholder={placeholder}cols="20" rows="5" defaultValue={filled}></textarea>
        </div>
    )
}

export default TextArea
