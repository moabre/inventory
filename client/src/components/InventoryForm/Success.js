import React from 'react'
import './Success.scss';
import logo from '../../assets/logo/InStock-Logo_1x.png';

const Success = () => {
    return (
        <div className="success">
            <div className="success-text">
                <div className="success-header">
                    <img className="success-logo" src={logo} alt="logo"/>
                </div>
                <h1 className="success-message">Your request has been submitted!</h1>
            </div>
        </div>
    )
}

export default Success
