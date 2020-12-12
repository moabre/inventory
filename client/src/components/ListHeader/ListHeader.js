import React from 'react'
import './ListHeader.scss'
import { ReactComponent as Sort} from '../../assets/icons/sort-24px.svg'

export default function ListHeader({inventoryPage, fifthElement}) {

    return (
        <div className="list-header">
            <div className="container">
                <div className="container__sub">
                    <div className="title">
                        <p>{inventoryPage ? "Inventory Item" : "Warehouse"}</p>
                        <Sort />
                    </div>
                    <div className="title">
                        <p>{inventoryPage ? "Category" : "Address"}</p>
                        <Sort />
                    </div>
                </div>
                <div className="container__sub">
                    <div className="title">
                        <p>{inventoryPage ? "Status" : "Contact Name"}</p>
                        <Sort />
                    </div>
                    <div className="title">
                        <p>{inventoryPage ? "Quantity" : "Contact Information"}</p>
                        <Sort />
                    </div>
                    <div  className={(fifthElement ? "title title--last--inventory" : "title title--last")}>
                        <p>Warehouse</p>
                        <Sort />
                    </div>
                </div>
                <div className="container__action">
                    <p>Actions</p>
                </div>
            </div>
        </div>
    )
}
