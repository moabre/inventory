import React from 'react';
import './ListWarehouseDetails.scss';
import trash from '../../assets/icons/delete_outline-24px.svg';
import edit from '../../assets/icons/edit-24px.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as FollowLink } from '../../assets/icons/chevron_right-24px.svg'
import InStock from '../StatusPills/InStock';
import OutStock from '../StatusPills/OutStock';

export default function ListWarehouseDetails({ inventoryPage, data, showModal }) {

    const handleDelete = () => {
        showModal(data.itemName, data.id);
    }

    return (
        <>
        <div className="list" key={data.id}>
            <div className="info">
                <div className="info__sub info__sub--first">
                    <div className="info__card info__card--first">
                        <p className="info__label">Inventory Item</p>
                        <div className="info__link">
                        <p className="info__content">
                            <Link 
                                to={{pathname: `/inventory/${data.id}`,
                            state: {
                                listInfo: data
                            }}} 
                                className="link--list">{data.itemName}
                            </Link>
                        </p>
                        <FollowLink />
                        </div>
                    </div>
                    <div className="info__card">
                        <p className="info__label">Category</p>
                        <p className="info__content">{data.category}</p>
                    </div>
                </div>
                <div className="info__sub">
                    <div className="info__card info__card--first">
                        <p className="info__label">Status</p>
                        <div className="info__content">
                            {data.status === "In Stock" ? <InStock/> : <OutStock />}
                        </div>
                    </div>
                    <div className="info__card info__card--second">
                        <p className="info__label">Qty</p>
                        <div>
                        <p className="info__content">{data.quantity}</p>
                        </div>
                    </div>
                    <div className={(inventoryPage ? "info__card info__card--last--inventory" :"info__card--last")}>
                        <p className="info__label">Contact Name</p>
                        <p className="info__content">Parmin Aujla</p>
                    </div>
                </div>
            </div>
            <div className="list-actions">
                {/* We want the delete modal on click*/}
                <img src={trash} alt="delete" className="action" onClick={handleDelete}/>
                {/*Pass in props here along with the edit key* Passin the full warehouse info*/}
                <Link to={
                    {pathname: `/inventory/${data.id}/edit`,
                    state: {
                        listInfo: data
                    }
                }}>
                    <img src={edit} alt="edit" className="action"/>
                </Link>
                
            </div>
        </div>
        </>
    )
}
