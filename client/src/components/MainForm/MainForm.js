import React from 'react'
import { Link } from 'react-router-dom'
import './MainForm.scss'

export default function MainForm({page}) {
    return (
        
        <form className="main-form">

            <input type="text" name="search" id="" placeholder="Search..." className="input-text"/>
            <Link to="warehouse/add">
                <button className="btn btn-blue btn-blue--warehouse">+ Add New {page}</button>
            </Link>

        </form>
    )
}
