import './App.scss';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header'
import WarehouseUpdate from './components/WarehouseUpdate/WarehouseUpdate';
import List from './components/List/List';
import Inventory from './components/pages/Inventory/Inventory';
import InventoryForm from './components/InventoryForm/InventoryForm';
import InventoryUpdate from './components/InventoryUpdate/InventoryUpdate';
import InventoryCard from './components/InventoryCard/InventoryCard';
import Warehouse from './components/pages/Warehouse/Warehouse';
import WarehouseDetails from './components/pages/WarehouseDetails/WarehouseDetails';
import Footer from './components/Footer/Footer';



function App() {
  return (
  
    <Router> 
    <Header />
    <Switch>

      <Route path="/warehouse/edit/:id" component={WarehouseUpdate}/>
      <Route path="/warehouse/add" component={WarehouseUpdate}/>
      <Route path='/inventory' exact component={Inventory}/>
      <Route path="/inventory/add" render={(routeProps)=>{return <InventoryForm {...routeProps}/>}} />
      <Route path="/inventory/:id" exact render={(routeProps)=>{return <InventoryCard {...routeProps}/>}} />
      <Route path="/inventory/:id/edit" render={(routeProps)=>{return <InventoryUpdate {...routeProps}/>}} />
      <Route path="/warehouse/:id" component={WarehouseDetails}/>
      <Route path="/" component={Warehouse} />

    </Switch>
    <Footer/>
    </Router>
    

  );
}

export default App;

