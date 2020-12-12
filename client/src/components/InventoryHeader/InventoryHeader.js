import React from 'react'
import './InventoryHeader.scss'
import { ReactComponent as Sort} from '../../assets/icons/sort-24px.svg'

export default function InventoryHeader ({inventoryPage, fifthElement}) {

    return (
        <div className="lists-headers">
            <div className="containers">
                <div className="containers__sub">
                    <div className="titles">
                        <p>{inventoryPage ? "Inventory Item" : "Warehouse"}</p>
                        <Sort />
                    </div>
                    <div className="titles">
                        <p>{inventoryPage ? "Category" : "Address"}</p>
                        <Sort />
                    </div>
                </div>
                <div className="containers__sub">
                    <div className="titles">
                        <p>{inventoryPage ? "Status" : "Contact Name"}</p>
                        <Sort />
                    </div>
                    <div className="titles">
                        <p>{inventoryPage ? "Quantity" : "Contact Information"}</p>
                        <Sort />
                    </div>
                    <div  className={(fifthElement ? "titles titles--last--inventory" : "titles title--last")}>
                        <p>Warehouse</p>
                        <Sort />
                    </div>
                </div>
                <div className="containers__action">
                    <p className = 'titles__label' >Actions</p>
                </div>
            </div>
        </div>
    )
}