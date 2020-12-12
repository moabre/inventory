import './Header.scss';
import React, { Component }from "react";
import logo from '../../assets/logo/InStock-Logo.svg'
import queryString from 'query-string';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink, 
  useLocation
} from "react-router-dom";

function Header () {
  const {pathname} = useLocation ();
  const query = useLocation().pathname;
  let word  = query.split('/')
  let id = word[2]
  let editid = word[3]
  
  return (
  <div className = "header">
  <Link to = '/'><img src={logo} className ='header__logo' alt='instock logo'></img></Link>
  <div className='header__button'>
   <NavLink strict to = '/warehouse' isActive={() => ['/warehouse', '/', `/warehouse/${id}`, `/warehouse/edit/${editid}`].includes(pathname)} activeClassName = 'active' className = 'button__warehouse'>Warehouses</NavLink>
  <NavLink strict to = '/inventory' activeClassName = 'active' className = 'button__inventory'>Inventory</NavLink>
  </div>
  </div>
  
  );
}

export default Header;