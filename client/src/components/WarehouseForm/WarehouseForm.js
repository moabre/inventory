import React,{Component} from 'react';
import './WarehouseForm.scss';
import Button from '../Button/Button';
import '../Button/Button.scss';
import Required from '../InventoryForm/Required';
import '../InventoryForm/Required.scss';
import backArrow from '../../assets/icons/arrow_back-24px.svg';
import axios from 'axios';
import Success from '../InventoryForm/Success';
class WarehouseForm extends Component {
    constructor(props){
        super(props);
        const {id, name,address,city,country,contact} =this.props.warehouse || {};
        const {isEdit}=this.props || false;
        this.state={
            //warehouse: this.props.warehouse
            id: id || null,
            name: name || '',
            address: address || '',
            city: city || '',
            country: country || '',
            contactName: (contact && contact.name) || '',
            position: (contact && contact.position) || '',
            phone: (contact && contact.phone) || '',
            email: (contact && contact.email) || '',
            isEdit,
            errors:{},
            showSuccess:false
        }
        this.handleInputChange =this.handleInputChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        
    }
    handleInputChange =(event)=>{
        const target = event.target;
        let value = target.value;
        const name = target.name;
        if(name === "phone") {
            let matchSet = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            let match1 = matchSet[2] ? matchSet[1] ? '+'+matchSet[1] + ' ': '': matchSet[1];
            let match2 = !matchSet[3]? matchSet[2] : '(' + matchSet[2] + ') ';
            let match3 = matchSet[3] + (matchSet[4] ? '-' + matchSet[4] : '')
            value = match1 + match2 + match3;
        }
        this.setState({
            [name]:value,
        });
    }
    gobackPage =()=>{
        this.props.history.goBack();
    }
    handleCancelBtn =(e)=>{
        e.preventDefault();
        this.gobackPage();
    }

    handleSubmitForm= (e)=>{
        e.preventDefault();

        if(this.validate()){
            //Resetting state with empty values for input array
            const newWarehouse={
                id: this.state.id || null,
                name: this.state.name,
                address: this.state.address,
                city: this.state.city,
                country: this.state.country,
                contactName: this.state.contactName,
                position:this.state.position,
                phone:this.state.phone,
                email:this.state.email
                
            }
            if(this.state.isEdit){
                //PUT query
                axios.put(`http://localhost:8080/warehouse/edit/${this.state.id}`,newWarehouse)
                    .then(res =>{
                        this.setState({
                            showSuccess:true
                        }, () => {
                            setTimeout(()=>this.gobackPage(),1000);
                        }); 
                    }).catch(error=>{
                        setTimeout(()=>this.gobackPage(),1000);
                    })
                
            }
            else{
                //POST query
                axios.post('http://localhost:8080/warehouse',newWarehouse)
                    .then(res =>{
                        this.setState({
                            showSuccess:true
                        }, () => {
                            setTimeout(()=>this.gobackPage(),1000);
                        }); 
                    }).catch(error=>{
                            setTimeout(()=>this.gobackPage(),1000);
                    })
            }
        }
    }
   
    validate(){
        let errors ={};
        let isValid = true;
        const{name,address,city,country, contactName,position,phone,email} = this.state;

        if(!name){
            isValid = false;
            errors["name"]="Please enter valid Warehouse name";
        }
        if(!address){
            isValid = false;
            errors["address"]="Please enter valid address";
        }
        if(!city){
            isValid = false;
            errors["city"]="Please enter valid city";
        }
        if(!country){
            isValid = false;
            errors["country"]="Please enter valid Country";
        }
        if(!contactName){
            isValid = false;
            errors["contactName"]="Please enter valid Contact name";
        }
        if(!position){
            isValid = false;
            errors["position"]="Please enter valid Position";
        }
        if(!phone){
            isValid = false;
            errors["phone"]="Please enter  Phone";  
        }
        if(typeof (phone)){
            let pattern =new RegExp(/^[+][0-9] [(][0-9]{3}[)] [0-9]{3}-[0-9]{4}$/g)
            if(!pattern.test(phone)){
                isValid = false;
                errors["phone"]="Please enter valid Phone number";
            }
        }
        if(!email){
            isValid = false;
            errors["email"]="Please enter Email";
        }
        if (typeof email !== "undefined") {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                isValid = false;
                errors["email"] = "Please enter valid email pattern.";
            }
        }
        
        this.setState({
            errors:errors
        });
        return isValid;
    }
    getClassName(type) {
        let className = `warehouse-details__input`;
        if(this.state.errors[type]) {
            className = `${className} ${className}--error `
        }
        return className;
    }
    
    render(){
        let submitButton;
        if(this.state.isEdit){
            submitButton=<Button type="submit"color="blue" text="Save" onClick={this.handleEditWarehouse} />
        }else{
            submitButton =<Button type="submit" svg="add-warehouse" color="blue" text="+ Add Warehouse" onClick={this.handleAddWarehouse}/>
        }
        
    return (
        <div className="main-content">
            <div className="warehouse-form-header">
                <img onClick={this.gobackPage} className="back-arrow" src={backArrow} alt="back-arrow"/>
                <h2 className="warehouse-form-header__title">{this.state.isEdit?"Edit":"Add"} Warehouse</h2>
            </div>
            <form className="add-warehouse" onSubmit={this.handleSubmitForm}>
                <div className="warehouse">
                    <div className="warehouse-details">
                        <p className="warehouse-details__title">Warehouse Details</p>
                        <label className="warehouse-details__label">Warehouse Name</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Warehouse Name"
                                className={this.getClassName('name')}
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.name)?<div className="warehouse-details__condition"><Required/></div>:null}
                        </div>
                    
                        <label className="warehouse-details__label">Street Address</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text"
                                placeholder="Street Address"
                                className={this.getClassName('address')}
                                name="address"
                                value={this.state.address}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.address)?<div className="warehouse-details__condition"><Required/></div>:null}
                        </div>  

                        <label className="warehouse-details__label">City</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text" 
                                placeholder="City" 
                                className={this.getClassName('city')}
                                name="city"
                                value={this.state.city}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.city)?<div className="warehouse-details__condition"><Required/></div>:null}
                        </div>
                        
                        <label className="warehouse-details__label">Country</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text"
                                placeholder="Country" 
                                className={`${this.getClassName('country')} warehouse-details__input--last`}
                                name="country"
                                value={this.state.country}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.country)?<div className="warehouse-details__condition--last"><Required/></div>:null}
                        </div>
                    </div>
                    
                    <div className="warehouse-details warehouse-details--bottom">
                        <p className="warehouse-details__title">Contact Details</p>
                        
                        <label className="warehouse-details__label">Contact Name</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Contact Name" 
                                className={this.getClassName('contactName')}
                                name="contactName"
                                value={this.state.contactName}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.contactName)?<div className="warehouse-details__condition"><Required/></div>:null}
                        </div>
                        
                        <label className="warehouse-details__label">Position</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Position" 
                                name="position"
                                className={this.getClassName('position')}
                                value={this.state.position}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.position)?<div className="warehouse-details__condition"><Required/></div>:null}
                        </div>

                        <label className="warehouse-details__label">Phone Number</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Phone Number" 
                                name="phone"
                                className={this.getClassName('phone')}
                                value={this.state.phone}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.phone)?<div className="warehouse-details__condition"><Required/></div>:null}
                        </div>
                        
                        <label className="warehouse-details__label">Email</label>
                        <div className="warehouse-details__input-wrapper">
                            <input 
                                type="text" 
                                placeholder="Email" 
                                name="email"
                                className={`${this.getClassName('email')} warehouse-details__input--last`}
                                value={this.state.email}
                                onChange={this.handleInputChange}/>
                            {(this.state.errors.email)?<div className="warehouse-details__condition--last"><Required/></div>:null}
                        </div>
                    </div>
                </div>
                <div className="form__button-tray">
                    <div className="form__buttons">
                        <Button color="white" text="Cancel" handleClick={this.handleCancelBtn}/>
                        {submitButton}
                    </div>
                </div>
            </form>
            {(this.state.showSuccess)? <Success/>:null}
        </div>
        
        );
    }
}

export default WarehouseForm;