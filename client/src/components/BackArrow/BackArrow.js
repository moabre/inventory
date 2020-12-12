import React from 'react';
import './BackArrow.scss';
import backarrow from '../../assets/icons/arrow_back-24px.svg'


//if you use this, you have to write your goBack() function in your component you're using this in
// write it out like </BackArrow onClick={"your goBack() function here: e.g. this.goBack || goBack "} />
const BackArrow = ({onClick}) => {

    return (
        <>
         <img onClick={onClick} src={backarrow} className="arrow" alt="back-arrow for navigation"/>
        </>
    )
}

export default BackArrow
