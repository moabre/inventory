import React from 'react'
import './Select.scss'

const Select = ({selected, label, type, handleChange, data, invalid}) => {
    return(
        (type === "category") ? 
        (
            <div className="label-input">
                <label htmlFor="invFormSelect">{label}</label>
                <select required noValidate className={(invalid) ? "select-invalid" : "select"} onChange={handleChange} name="CategorySelect" id="CategorySelect" defaultValue={(selected) ? selected : 'default'}>
                    <option value="default"disabled>Please Select</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Apparel">Apparel</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Gear">Gear</option>
                    <option value="Health">Health</option>
                </select>
            </div>
        ) : 
        (
            <div className="label-input">
                <label htmlFor="invFormSelect">{label}</label>
                <select key={Math.floor(Math.random() * 100000)} required noValidate className={(invalid) ? "select-invalid" : "select"} onChange={handleChange} name="WarehouseSelect" id="WarehouseSelect" defaultValue={(selected) ? selected : 'default'}>
                    <option value="default" disabled>Please Select</option>
                    {data.map(warehouse => {
                        return (
                        <option key={warehouse.id} value={warehouse.name + "/" + warehouse.id}>{warehouse.name}</option>
                        )
                    })}
                </select>
            </div>
        )
        
    )
}

export default Select
