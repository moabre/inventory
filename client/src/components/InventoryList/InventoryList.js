import React, { Component } from 'react';
import './InventoryList.scss';
import trash from '../../assets/icons/delete_outline-24px.svg'; 
import { ReactComponent as Edit} from '../../assets/icons/edit-24px.svg'
import { Link } from 'react-router-dom';
import { ReactComponent as FollowLink } from '../../assets/icons/chevron_right-24px.svg';
import InStock from '../StatusPills/InStock';
import OutStock from '../StatusPills/OutStock';

class InventoryList extends Component {
    constructor (props){
        super(props);
        this.state = {
                inventory: this.props.inventory,
                listInfo: [],
        }       
    }

    render () {
        const handleDelete = (event) => {
            this.props.showModal(event.target.id);
        }
        const editButton = (event) => {
            for (let i = 0; i<this.state.inventory.length; i++){
                if(event.target.id === this.state.inventory[i].id){
                    this.setState({
                        listInfo: this.state.inventory[i]
                    })
                }
            }
        }

        return(
            <div>
            {this.props.inventory.map (item => {
            return (
            <div key={item.id} className="lists">
                <div className="infos">
                    <div className="infos__sub infos__sub--first">
                        <div className="infos__card infos__card--first">
                            <p className="infos__label">INVENTORY ITEM</p>

                            <div className = 'infos__link'> 
                             <p className="infos__content"><Link className="infos__links" to = {{pathname: `/inventory/${item.id}`, state: {
                                listInfo: item
                            }}}>{item.itemName}</Link></p>
                            <FollowLink />
                            </div>

                        </div>
                        <div className="infos__card">
                            <p className="infos__label">CATEGORY</p>
                            <p className="infos__content">{item.category}</p>
                        </div>
                    </div>
                    <div className="infos__sub">
                        <div className="infos__card infos__card--first">
                            <p className="infos__label">STATUS</p>
                            <div className="infos__content">
                            {item.status === "In Stock" ? <InStock/> : <OutStock />}</div>
                        </div>
                        <div className="infos__card infos__card--second">
                            <p className="infos__label">QTY</p>
                            <div>
                            <p className="infos__content">{item.quantity}</p>
                            </div>
                        </div>
                        <div className="infos__card infos__card--third">
                        <p className="infos__label">WAREHOUSE</p>
                        <div>
                        <p className="infos__content">{item.warehouseName}</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="list-actions">
                    {/* We want the delete modal on click*/}
                    <Link onClick={handleDelete} id={item.id} to = {{pathname: `/inventory`}}>
                    <img id={item.id} src={trash} alt="delete" className="action" />
                    </Link>
                    {/* We want the link here */}
                    {/*Pass in props here along with the edit key* Passin the full warehouse info*/}
                    <Link onClick={editButton} id={item.id} className="inventory__edit" to={
                        {pathname: `/inventory/${item.id}/edit`,
                        state: {
                            listInfo: {
                                category: item.category,
                                description: item.description,
                                id: item.id,
                                itemName: item.itemName,
                                quantity: item.quantity,
                                status: item.status,
                                warehouseID: item.warehouseID,
                                warehouseName: item.warehouseName
                            }
                        }
                    }}>
                    <div className="inventory-edit" id={item.id}>
                        <Edit className="inventroy-edit__button" id={item.id}/>
                    </div>
                    </Link>
                </div> 
            </div>
            )
        })}
        </div>
        )
       
        
    }
}   


export default InventoryList;