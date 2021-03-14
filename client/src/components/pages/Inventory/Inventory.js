import React, { Component } from 'react';
import InventoryList from '../../InventoryList/InventoryList';
import MainFormInventory from '../../MainFormInventory/MainFormInventroy';
import InventoryModal from '../../InventoryModal/InventoryModal';
import InventoryHeader from '../../InventoryHeader/InventoryHeader';
import './Inventory.scss';
import axios from 'axios';
import './Inventory.scss';
export default class Inventory extends Component {
  state = {
    inventory: [],
    isModalVisible: false,
    item: '',
    id: '',
  };
  showModal = (id) => {
    for (let i = 0; i < this.state.inventory.length; i++) {
      if (id === this.state.inventory[i].id) {
        this.setState({
          isModalVisible: true,
          item: this.state.inventory[i].itemName,
          id: this.state.inventory[i].id,
        });
      }
    }
  };
  hideModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  updateList = (updateList) => {
    this.setState({
      inventory: updateList,
    });
  };

  //component did mount to get all of the data from the backend
  componentDidMount() {
    axios
      .get('/inventory')
      .then((res) => {
        this.setState({
          inventory: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <main className='mains'>
        <div className='mains__search'>
          <div className='search__title'>
            <h1>Inventory</h1>
          </div>
          <MainFormInventory page={'Item'} />
        </div>
        <InventoryHeader inventoryPage={true} fifthElement={true} />
        <InventoryList
          inventory={this.state.inventory}
          id={this.state.inventory.id}
          isVisible={this.state.isModalVisible}
          showModal={this.showModal}
        />
        <InventoryModal
          isVisible={this.state.isModalVisible}
          hideModal={this.hideModal}
          updateList={this.updateList}
          item={this.state.item}
          id={this.state.id}
        />
      </main>
    );
  }
}
