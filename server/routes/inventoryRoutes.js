const { json } = require("express");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

router.use(express.json());

function readInventory(){
    const fileContent = fs.readFileSync("./data/inventories.json");
    return (JSON.parse(fileContent));
}
//Get request
router.get('/', (_req, res) => {
    const inventory = readInventory();
    res.status(200).json(inventory);
})
//Get request
router.get('/:id', (req, res) => {
    const itemId = req.params.id
    const filteredItem = readInventory().find(item => item.id === itemId)
    res.status(200).json(filteredItem)
})
//PUT request to edit an Inventory Item
router.put('/:id', (req, res) => {
    //getting the ID of the item needed to be edited
    const itemId = req.params.id
    //destructuring the body request
    const {warehouseID, warehouseName, itemName, description, category, status, quantity} = req.body
    //copy of the data
    data = readInventory();
    //targetting the single edited item
    let editItem = []
    //looping through to find the correct item with the ID given, and editing it's values from req.body
    for (let i = 0; i < data.length; i++){
        if (data[i].id === itemId){
            data[i] = {
                ...data[i],
                warehouseID,
                warehouseName,
                itemName,
                description,
                category,
                status,
                quantity
            }
            // setting found item to be displayed as editItem
            editItem = data[i]
        }
    }
    //writing the new file to keep persistent
    fs.writeFileSync('./data/inventories.json', JSON.stringify(data))
    res.status(201).send(editItem)
})

//Posting to 'localhost:8080/inventory'
router.post('/', (req, res) => {
    //from Front-end
    //destructuring req.body
    const {warehouseID, warehouseName, itemName, description, category, status, quantity} = req.body
    //validating that ALL information - will send 400 code and an error message back
    if(!warehouseID || !warehouseName || !itemName || !description || !category || !status ){
        res.status(400).send("Bad Request - Missing fields")
        console.log(error);
    }
    //creating the new Inventory item as an object to push to our main data
    const newItem = {
        id: uuidv4(),
        warehouseID,
        warehouseName,
        itemName,
        description,
        category,
        status,
        quantity
    }
    // Making a copy of the data and then pushing new item into it
    let newData = readInventory()
    newData.push(newItem)

    //will overwrite data and create the new persisting data
    fs.writeFileSync("./data/inventories.json", JSON.stringify(newData))
    res.status(201).send("Item has been added to the Inventory")
})
//Delete from 'localhost:8080/inventory'
router.delete('/:id', (req, res) => {
    //getting the ID of the item needed to be edited
    const itemId = req.params.id
    // reading the data from readInventory ()
    dataInventory = readInventory();
    //looping through to find the correct item with the ID given, and deleting its values
    for (let i = 0; i < dataInventory.length; i++){
        if (dataInventory[i].id === itemId){
            //removing the selected id item from the array 
            dataInventory.splice(i, 1)
        }
    }
    //will overwrite data and create the new persisting data
    fs.writeFileSync("./data/inventories.json", JSON.stringify(dataInventory))
    res.status(201).json(dataInventory)
})

module.exports = router;
