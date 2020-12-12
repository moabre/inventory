import React from 'react'
import { Link } from 'react-router-dom'
import './MainFormInventory.scss'
import search from '../../assets/icons/search-24px.svg' 

export default function MainFormInventory({page}) {
    return (
        <form className="main-forms">
            
            <input type="text" name="" id="" placeholder="Search..." className="inputs"/>
            {/* <img src ={search} alt= 'search' className = 'inputs__search'/>  */}
            
            <Link to="inventory/add">
                <button className="btn btn-blue btn-blue--warehouse">+ Add New Item</button>
            </Link>

        </form>
    )
}