import React from 'react';
import './List.scss';
import trash from '../../assets/icons/delete_outline-24px.svg';
import edit from '../../assets/icons/edit-24px.svg';
import { Link } from 'react-router-dom';
import { ReactComponent as FollowLink } from '../../assets/icons/chevron_right-24px.svg';

export default function List({ inventoryPage, data, showModal }) {

    const handleDelete = () => {
        showModal(data.name, data.id);
    }

    return (
        <>
        <div className="list">
            <div className="info">
                <div className="info__sub info__sub--first">
                    <div className="info__card info__card--first">
                        <p className="info__label">WAREHOUSE</p>
                        <div className="info__link">
                        <p className="info__content">
                            <Link 
                                to={{pathname: `/warehouse/${data.id}`,
                            state: {
                                listInfo: data
                            }}} 
                                className="link--list">{data.name}
                            </Link>
                        </p>
                        <FollowLink />
                        </div>
                    </div>
                    <div className="info__card">
                        <p className="info__label">ADDRESS</p>
                        <p className="info__content">{data.address}, {data.city}, {data.country}</p>

                    </div>
                </div>
                <div className="info__sub">
                    <div className="info__card info__card--first">
                        <p className="info__label">CONTACT NAME</p>
                        <p className="info__content">

                        {data.contact.name}</p>

                    </div>
                    <div className="info__card info__card--second">
                        <p className="info__label">CONTACT INFORMATION</p>
                        <div>
                        <p className="info__content">{data.contact.phone}</p>
                        <p className="info__content">{data.contact.email}</p>
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
                {/* We want the link here */}
                {/*Pass in props here along with the edit key* Passin the full warehouse info*/}
                <Link to={
                    {pathname: `/warehouse/edit/${data.id}`,
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
