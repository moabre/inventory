import React from 'react'
import error from '../../assets/icons/error-24px.svg';
import './Required.scss';

const Required = () => {
    return (
        <div className="required">
            <img className="required__error"src={error} alt="error"/>
            <p className="required__text">This field is required</p>
        </div>
    )
}

export default Required
