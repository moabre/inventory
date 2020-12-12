import { ReactComponent as Back } from '../../../assets/icons/arrow_back-24px.svg'
import { ReactComponent as EditWhite} from '../../../assets/icons/edit-24px-white.svg'
import ListHeader from '../../ListHeader/ListHeader';
import Modal from '../../Modal/Modal';
import './WarehouseDetails.scss';
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ListWarehouseDetails from '../../ListWarehouseDetails/ListWarehouseDetails';
import axios from 'axios';
import BackArrow from '../../BackArrow/BackArrow'

export default class WarehouseDetails extends Component {

    state = {
        warehouseDetails: null,
        isModalVisible: false,
        itemToDelete: "",
        warehouseInfo: null,
        toDeleteId: ""
    }

    showModal = (item, id) => {
        this.setState({
            isModalVisible: true,
            itemToDelete: item,
            toDeleteId: id
        })
    }

    hideModal = () => {
        this.setState ({
            isModalVisible: false
        })
    }
    goBack = () => {
        this.props.history.goBack();
    }
    componentDidMount() {
        axios.get(`http://localhost:8080${this.props.match.url}`)
        .then(res=>{
            this.setState({
                warehouseDetails: res.data.inventory,
                warehouseInfo: res.data.warehouse[0]
            })
        })
        .catch(err=>console.log(err))
        
    }
    updateList = (updateList) => {
        this.setState ({
            warehouse: updateList
        })
    }
    render() {
        
       if(this.state.warehouseInfo){
        return (
            <main className="main main-warehouse">
            <div className="page-title page-title--detail">
                <div className="page-title--button">
                    <BackArrow onClick={this.goBack} />
                {this.state.warehouseInfo.name}
                </div>
                    <Link to={
                        {pathname: `/warehouse/edit/${this.state.warehouseInfo.id}`,
                        state: {
                            listInfo: this.state.warehouseInfo
                        }
                    }}>
                    <div className="warehouse-edit">
                        <EditWhite className="warehouse-edit__button"/>
                        <p className="warehouse-edit__text">Edit</p>
                    </div>
                </Link>
                </div>
            
            <div className="invCard__info">
                <div className="invCard__split">
                    <div className="invCard__left">
                        <div className="invCard__desc">
                            <h4 className="invCard__label">Warehouse Address</h4>
                            <p className="invCard__fill">{this.state.warehouseInfo.address},</p>
                            <p className="invCard__fill">{this.state.warehouseInfo.city}, {this.state.warehouseInfo.country}</p>
                        </div>
                    </div>
                    <div className="invCard__right">
                        <div className="invCard__stock">
                            <div className="invCard__status">
                                <h4 className="invCard__label">Contact Name:</h4>
                                <p className="invCard__fill">{this.state.warehouseInfo.contact.name}</p>
                                <p className="invCard__fill">{this.state.warehouseInfo.contact.position}</p>
                            </div>
                            <div className="invCard__quantity">
                                <h4 className="invCard__label">Contact information</h4>
                                <p className="invCard__fill">{this.state.warehouseInfo.contact.phone}</p>
                                <p className="invCard__fill">{this.state.warehouseInfo.contact.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ListHeader inventoryPage={true} />
            <div className="component">
                {this.state.warehouseDetails.map(data=>{
                    return (
                        <div key={data.id}>
                            <ListWarehouseDetails
                            showModal={this.showModal}
                            data={data}
                            
                            />
                        </div>
                    )
                })}
            </div>
            <Modal 
            isVisible={this.state.isModalVisible} 
            hideModal={this.hideModal} 
            toDelete={this.state.itemToDelete}
            inventoryPage={true}
            toDeleteId={this.state.toDeleteId}
            updateList={this.updateList}/>
        </main>
        )
       } else {
        return (

            <main className="main main-warehouse">
                <div className="page-title page-title--detail">
                    <div className="page-title--button">
                    <Back/>
                    Warehouse is loading D:
                    </div>
                </div>
            </main>

        )
       }
    }
}
