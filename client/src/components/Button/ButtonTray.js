import Button from './Button';
import './Button.scss';

import React from 'react'

const ButtonTray = ({color, text}) => {
    return (
        <div className="btn-wrapper">
            <Button color="white" text="Cancel"/>
            <Button color={color} text={text}/>
        </div>
    )
}

export default ButtonTray
