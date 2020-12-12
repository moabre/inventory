import React from 'react';
import './Button.scss';

const Button = ({type, color, text, svg, handleClick}) => {
    return (
        <>
            <button onClick={(handleClick) ? handleClick : null} className={`btn btn-${color} ${(svg) ? `btn-${svg}` : ""}`}type={(type) ? `${type}` : ""}>{text}</button>
        </>
    )
}

export default Button
