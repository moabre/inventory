import React from 'react';
import axios from 'axios';
import './Modal.scss';
import { ReactComponent as Cancel } from '../../assets/icons/close-24px.svg';

//modal need to receive a props to check if it should show or not and also receive a function to toggle the state
export default function Modal({
  isVisible,
  hideModal,
  toDelete,
  inventoryPage,
  toDeleteId,
  updateList,
}) {
  const handleCancel = () => {
    hideModal();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    //axios delete request
    axios
      .delete(
        inventoryPage ? `/inventory/${toDeleteId}` : `/warehouse/${toDeleteId}`
      )
      .then((res) => {
        updateList(res.data);
        hideModal();
      })
      .catch((err) => console.log(err));
  };
  if (!isVisible) {
    return null;
  } else {
    return (
      <div className='modal'>
        <div className='modal__contents'>
          <div>
            <div className='cancel'>
              <Cancel onClick={handleCancel} />
            </div>
            <h1>
              Delete {toDelete} {inventoryPage ? 'Inventory Item' : 'Warehouse'}
              ?
            </h1>
            <p>
              Please confirm that you'd like to delete the {toDelete} from the{' '}
              {inventoryPage ? 'inventory list' : 'list of warehouses'}. You
              won't be able to undo this action.
            </p>
          </div>
          <div className='modal-btn-tray'>
            <button className='btn btn-white btn-modal' onClick={handleCancel}>
              Cancel
            </button>
            <button className='btn btn-red btn-modal' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
