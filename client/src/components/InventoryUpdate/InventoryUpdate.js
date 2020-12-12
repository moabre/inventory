import React from 'react'
import InventoryForm from '../InventoryForm/InventoryForm';

const InventoryUpdate = ({match, location, history}) => {
    const isEdit = match.path.includes('edit')
    
    return ((isEdit) ? 
    <InventoryForm 
    match={match} 
    history={history} 
    data={(location.state.listInfo) ? location.state.listInfo : null}/> 
    : 
    <InventoryForm 
    match={match} 
    history={history}/>)
}

export default InventoryUpdate
