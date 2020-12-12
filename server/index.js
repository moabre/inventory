const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use(express.json());
app.use(cors());

//Express Routes
app.use("/warehouse", warehouseRoutes);
app.use("/inventory",inventoryRoutes);

app.listen(PORT, () => {
    console.log(`Express server listening on ${PORT}`);
});