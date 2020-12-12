import axios from 'axios'
import React, { Component } from 'react'
import List from '../../List/List'
import ListHeader from '../../ListHeader/ListHeader'
import MainForm from '../../MainForm/MainForm'
import Modal from '../../Modal/Modal'
import './Warehouse.scss'
export default class Warehouse extends Component {

    state = {
        warehouse: [],
        isModalVisible: false,
        warehouseToDelete: "",
        toDeleteId: ""
    }

    showModal = (location, id) => {
        this.setState({
            isModalVisible: true,
            warehouseToDelete: location,
            toDeleteId: id
        })
    }

    hideModal = () => {
        this.setState ({
            isModalVisible: false
        })
    }

    updateList = (updateList) => {
        this.setState ({
            warehouse: updateList
        })
    }
    //component did mount to get all of the data from the backend
    componentDidMount(){
      axios.get('http://localhost:8080/warehouse')
      .then(res=>{
        this.setState({
          warehouse: res.data
        })
      })
      .catch(err=> console.log(err))
    }
    render() {
        return (
            <main className="main main-warehouse">
                <div className="page-title"><h1 className="page-title__content">Warehouses</h1></div>
                <MainForm page={"Warehouse"}/>
                <ListHeader/>
                <div className="component">
                {this.state.warehouse.map(data=> {
                    return  (
                    <div key={data.id}>
                        <List 
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
                    toDelete={this.state.warehouseToDelete}
                    toDeleteId={this.state.toDeleteId}
                    updateList={this.updateList}/>
            </main>
        )
    }
}
