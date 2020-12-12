const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

function readWarehouse(){
    const fileContent = fs.readFileSync("./data/warehouses.json");
    return (JSON.parse(fileContent));
}
function readInventory(){
    const fileContent = fs.readFileSync("./data/inventories.json");
    return (JSON.parse(fileContent));
}
router.get("/",(req,res)=>{
    let warehouseData = readWarehouse();
    res.status(200).json(warehouseData);
})
//get the id and loop thru the inventories data and show all the stuff in that warehouse
router.get('/:id', (req,res)=> {
    //get warehouse id and loop thru all the items
    let warehouseData = readWarehouse();
    let inventoryData = readInventory();
    let specificWarehouseInventory = inventoryData.filter(data => data.warehouseID == req.params.id)
    let specificWarehouse = warehouseData.filter(data=>data.id ==req.params.id)
    
    res.status(200).send({
        inventory:specificWarehouseInventory,
        warehouse:specificWarehouse});
})
//get the id and loop warehouse and delete warehouse with the matching id
router.delete('/:id', (req,res)=> {
    //get warehouse id and loop thru all the items
    if(!req.params.id){
        res.status(400).send("Warehouse ID is invalid");
        console.log(error);
    }
    let warehouseData = readWarehouse();
    let specificWarehouse = warehouseData.filter(data => data.id !== req.params.id)
    //put the delete logic here
    fs.writeFileSync("./data/warehouses.json", JSON.stringify(specificWarehouse))
    res.status(200).json(specificWarehouse);
})

//Add warehouse
router.post('/',(req,res)=>{
    const{name,address,city,country, contactName,position,phone,email}=req.body;
    if(!name||!address ||!city ||!country ||!contactName ||!position||!phone ||!email){
        res.status(400).send('Certain fields are empty');
    }
    const newWarehouse={
        id: uuidv4(),
        name,
        address,
        city,
        country,
        contact:{
            name: contactName,
            position:position,
            phone:phone,
            email:email
        }
    }
    let warehouseArray = readWarehouse();
    warehouseArray.push(newWarehouse);
    fs.writeFileSync("./data/warehouses.json",JSON.stringify(warehouseArray));

    res.status(201).send("New Warehouse has been added");
})

//Edit Warehouse
router.put('/edit/:id',(req,res)=>{
    const warehouseId = req.params.id;
    const{name,address,city,country, contactName,position,phone,email}=req.body;
    
    if(!name||!address ||!city ||!country ||!contactName ||!position||!phone ||!email){
        res.status(400).send('Certain fields are empty');
    }
    const editedWarehouse={
        id: req.params.id,
        name,
        address,
        city,
        country,
        contact:{
            name: contactName,
            position:position,
            phone:phone,
            email:email
        }
    }
    let warehouseArray = readWarehouse();

    for(let i=0;i<warehouseArray.length;i++){
        if(warehouseArray[i].id==warehouseId){
            warehouseArray[i]=editedWarehouse;
        }
    }
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(warehouseArray));
    res.status(201).send("Warehouse has been updated");
})

module.exports = router;
