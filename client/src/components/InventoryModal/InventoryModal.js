import React, { Component } from 'react';
import './InventoryModal.scss';
import { ReactComponent as Cancel } from '../../assets/icons/close-24px.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';


//modal need to receive a props to check if it should show or not and also receive a function to toggle the state
//props to be received - stuff to be deleted name
export default class InventoryModal extends Component{
    state = {
            inventory: this.props.inventory,
            listInfo: [],
    }              
    
    handleCancel = () => {
        this.props.hideModal();
    }

    // add button function to call delete axios request 
    handleDelete = (event) =>{
        event.preventDefault();
        axios.delete(`http://localhost:8080/inventory/${this.props.id}`)
        .then(res=>{
            this.props.updateList(res.data)
            this.props.hideModal();
        })
        .catch(err=> console.log(err))
    }
    
    render(){
        if(!this.props.isVisible) {
            return null;
        } 
        else {
            return (
                <div className="modal">
                    <div className="modal__contents">
                        <div>
                        <div className="cancel">
                            <Cancel onClick={this.handleCancel}/>
                        </div>
                            <h1>Delete {this.props.item} Warehouse?</h1>
                            <p>Please confirm that you'd like to delete the {this.props.item} from the list of inventory items. You won't be able to undo this action.</p>
                        </div>
                        <div className="modal-btn-tray">
                            <button className="btn btn-white btn-modal" onClick={this.handleCancel}>Cancel</button>
                            <Link to = '/inventory' className="btn btn-red btn-modal btn-link" onClick={this.handleDelete}>Delete</Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}   
