import React from 'react';
import axios from 'axios';
import Success from './Success';
import Button from '../Button/Button';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import './temp.scss';
import Required from './Required';
import BackArrow from '../BackArrow/BackArrow';
import { Redirect } from 'react-router-dom';

class InventoryForm extends React.Component {
  state = {
    info: {
      name: '',
      description: '',
      category: '',
      status: this.props.data ? this.props.data.status : 'In Stock',
      warehouse: '',
      quantity: 0,
    },
    warehouseData: [],
    itemError: false,
    warehouseError: false,
    categoryError: false,
    descriptionError: false,
    quantityError: false,
    showQuantity: this.props.data
      ? this.props.data.status === 'In Stock'
        ? true
        : false
      : true,
    showSuccess: false,
  };

  componentDidMount = () => {
    axios.get('/warehouse').then((res) => {
      const data = res.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      this.setState({
        warehouseData: data,
      });
    });
  };
  // Handles the change of In Stock and Out of Stock radio select, changes state to it's appropriate data
  onChange = (e) => {
    this.setState((prevState) => ({
      info: {
        ...prevState.info,
        status: e.target.value,
        quantity: 0,
      },
      quantityError: false,
      showQuantity: !prevState.showQuantity,
    }));
  };
  // Handles the value of quantity through state and what's in the input
  handleQuantity = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        quantity: e.target.value,
      },
    });
  };
  // Handles the form and validation of the form
  handleSubmit = (e) => {
    e.preventDefault();
    const warehouseID = e.target.WarehouseSelect.value.split('/')[1];
    const warehouseName = e.target.WarehouseSelect.value.split('/')[0];
    const itemName = e.target.inventoryName.value;
    const description = e.target.invDescriptionInput.value;
    const category = e.target.CategorySelect.value;
    const status = e.target.InventoryStatus.value;
    const quantity = this.state.info.quantity;

    if (warehouseName === 'default') {
      this.setState({
        warehouseError: true,
      });
    }
    if (!itemName) {
      this.setState({
        itemError: true,
      });
    }
    if (!description) {
      this.setState({
        descriptionError: true,
      });
    }
    if (category === 'default') {
      this.setState({
        categoryError: true,
      });
    }
    if (quantity === '') {
      this.setState({
        quantityError: true,
      });
    }

    const newInventory = {
      warehouseID,
      warehouseName,
      itemName,
      description,
      category,
      status: quantity === 0 || quantity === '0' ? 'Out of Stock' : status,
      quantity: Number(quantity),
    };
    if (
      warehouseName === 'default' ||
      !itemName ||
      !description ||
      category === 'default' ||
      quantity === ''
    ) {
      return;
    } else if (this.props.match.params.id) {
      axios
        .put(`/inventory/${this.props.match.params.id}`, newInventory)
        .then((res) => {
          this.setState({
            showSuccess: true,
          });
        });
      setTimeout(() => {
        this.goBack();
      }, 1000);
    } else {
      axios.post('/inventory', newInventory).then((res) => {
        this.setState({
          showSuccess: true,
        });
      });
      setTimeout(() => {
        this.goBack();
      }, 1000);
    }
  };

  // Goes back to previously visisted page
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className='inv-form'>
        <div className='inv-form-header'>
          <BackArrow onClick={this.goBack} />
          <h1 className='inv-form-title'>
            {this.props.match.params.id
              ? 'Edit Inventory Item'
              : 'Add New Inventory Item'}
          </h1>
        </div>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className='form-split'>
            <div className='inv-details'>
              <h2 className='inv-title'>Item Details</h2>
              {this.state.itemError ? (
                <Input
                  invalid
                  id='inventoryName'
                  type='text'
                  label='Item Name'
                  placeholder='Item Name'
                  filled={this.props.data ? this.props.data.itemName : ''}
                />
              ) : (
                <Input
                  id='inventoryName'
                  type='text'
                  label='Item Name'
                  placeholder='Item Name'
                  filled={this.props.data ? this.props.data.itemName : ''}
                />
              )}
              {this.state.itemError ? <Required /> : null}

              {this.state.descriptionError ? (
                <TextArea
                  invalid
                  label='Description'
                  name='invDescriptionInput'
                  placeholder='Please enter a brief item description...'
                  filled={this.props.data ? this.props.data.description : ''}
                />
              ) : (
                <TextArea
                  label='Description'
                  name='invDescriptionInput'
                  placeholder='Please enter a brief item description...'
                  filled={this.props.data ? this.props.data.description : ''}
                />
              )}

              {this.state.descriptionError ? <Required /> : null}

              {this.state.categoryError ? (
                <Select
                  invalid
                  label='Category'
                  type='category'
                  selected={
                    this.props.data ? this.props.data.category : 'default'
                  }
                />
              ) : (
                <Select
                  label='Category'
                  type='category'
                  selected={
                    this.props.data ? this.props.data.category : 'default'
                  }
                />
              )}

              {this.state.categoryError ? <Required /> : null}
            </div>
            <div className='inv-avail'>
              <h2 className='inv-title'>Item Availability</h2>
              <div className='inv-radio'>
                <label className='inv-radio-title'>Status</label>
                <div className='radio-input'>
                  <div className='radio-wrapper'>
                    <input
                      id='InventoryStatus'
                      value='In Stock'
                      type='radio'
                      checked={this.state.info.status === 'In Stock'}
                      onChange={this.onChange}
                    />
                    <label className='radio' htmlFor='In Stock'>
                      In Stock
                    </label>
                  </div>
                  <div className='radio-wrapper'>
                    <input
                      id='InventoryStatus'
                      value='Out of Stock'
                      type='radio'
                      checked={this.state.info.status === 'Out of Stock'}
                      onChange={this.onChange}
                    />
                    <label className='radio' htmlFor='Out of Stock'>
                      Out of stock
                    </label>
                  </div>
                </div>
              </div>
              {this.state.showQuantity ? (
                this.state.quantityError ? (
                  <Input
                    invalid
                    type='number'
                    handleChange={this.handleQuantity}
                    label='Quantity'
                    filled={this.props.data ? this.props.data.quantity : '0'}
                    id='InventoryQuantity'
                  />
                ) : (
                  <Input
                    type='number'
                    handleChange={this.handleQuantity}
                    label='Quantity'
                    filled={this.props.data ? this.props.data.quantity : '0'}
                    id='InventoryQuantity'
                  />
                )
              ) : (
                ''
              )}
              {this.state.quantityError ? <Required /> : null}
              {this.state.warehouseError ? (
                <Select
                  invalid
                  data={
                    this.state.warehouseData
                      ? this.state.warehouseData
                      : ['Loading']
                  }
                  label='Warehouse'
                  selected={
                    this.props.data
                      ? this.props.data.warehouseName +
                        '/' +
                        this.props.data.warehouseID
                      : 'default'
                  }
                />
              ) : (
                <Select
                  data={
                    this.state.warehouseData
                      ? this.state.warehouseData
                      : ['Loading']
                  }
                  label='Warehouse'
                  selected={
                    this.props.data
                      ? this.props.data.warehouseName +
                        '/' +
                        this.props.data.warehouseID
                      : 'default'
                  }
                />
              )}

              {this.state.warehouseError ? <Required /> : null}
            </div>
          </div>
          <div className='inv__btn-container'>
            <Button
              type='button'
              color='white'
              handleClick={this.goBack}
              text='Cancel'
            />

            <Button
              type='submit'
              color='blue'
              text={this.props.data ? 'Save' : '+ Add Item'}
            />
          </div>
          {this.state.showSuccess ? <Success /> : null}
        </form>
      </div>
    );
  }
}

export default InventoryForm;
