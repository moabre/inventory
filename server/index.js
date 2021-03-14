const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const warehouseRoutes = require('./routes/warehouseRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

//Port to listen on
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

//Express Routes
app.use('/warehouse', warehouseRoutes);
app.use('/inventory', inventoryRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
