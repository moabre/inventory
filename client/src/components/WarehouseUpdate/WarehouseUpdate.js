import React from 'react';
import WarehouseForm from '../WarehouseForm/WarehouseForm';
import './WarehouseUpdate.scss'; 

const WarehouseUpdate = (props) => {
    const isEdit = props.match.params.id;
    let warehouse ={}
    if(isEdit){
      warehouse  = props.location.state.listInfo;
    }

    return (isEdit
         ? <WarehouseForm warehouse={warehouse} isEdit={true} {...props}/> 
         : <WarehouseForm {...props}/>);
    
};

export default WarehouseUpdate; 