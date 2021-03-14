import React from 'react';
import axios from 'axios';
import BackArrow from '../BackArrow/BackArrow';
import { Link } from 'react-router-dom';
import './InventoryCard.scss';
import Button from '../Button/Button';
import InStock from '../StatusPills/InStock';
import OutStock from '../StatusPills/OutStock';

class InventoryCard extends React.Component {
  // const inventoryID = match.params.id

  state = {
    itemInfo: {},
  };

  goBack = () => {
    this.props.history.goBack();
  };
  data = this.props.location.state.listInfo;

  componentDidMount = () => {
    axios.get(`/inventory/${this.props.match.params.id}`).then((res) => {
      this.setState({
        itemInfo: res.data,
      });
    });
  };
  render() {
    return (
      <div className='invCard'>
        <div className='invCard__header'>
          <BackArrow onClick={this.goBack} />
          <h1 className='invCard__header-title'>
            {this.state.itemInfo.itemName}
          </h1>
          <Link
            to={{
              pathname: `/inventory/${this.props.match.params.id}/edit`,
              state: {
                listInfo: this.state.itemInfo,
              },
            }}
          >
            <div className='invCard-m-btn'>
              <Button color='blue' svg='edit' />
            </div>
          </Link>
          <Link
            to={{
              pathname: `/inventory/${this.props.match.params.id}/edit`,
              state: {
                listInfo: this.state.itemInfo,
              },
            }}
          >
            <div className='invCard-td-btn'>
              <Button text='Edit' color='blue' svg='edit-td' />
            </div>
          </Link>
        </div>
        <div className='invCard__info'>
          <div className='invCard__split'>
            <div className='invCard__left'>
              <div className='invCard__desc'>
                <h4 className='invCard__label'>ITEM DESCRIPTION:</h4>
                <p className='invCard__fill'>
                  {this.state.itemInfo.description}
                </p>
              </div>
              <div className='invCard__category'>
                <h4 className='invCard__label'>CATEGORY:</h4>
                <p className='invCard__fill'>{this.state.itemInfo.category}</p>
              </div>
            </div>
            <div className='invCard__right'>
              <div className='invCard__stock'>
                <div className='invCard__status'>
                  <h4 className='invCard__label'>STATUS:</h4>
                  {this.state.itemInfo.status === 'In Stock' ? (
                    <InStock />
                  ) : (
                    <OutStock />
                  )}
                </div>
                <div className='invCard__quantity'>
                  <h4 className='invCard__label'>QUANTITY:</h4>
                  <p className='invCard__fill'>
                    {this.state.itemInfo.quantity}
                  </p>
                </div>
              </div>
              <div className='invCard__warehouse'>
                <h4 className='invCard__label'>WAREHOUSE</h4>
                <p className='invCard__fill'>
                  {this.state.itemInfo.warehouseName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InventoryCard;
