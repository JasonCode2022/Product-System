// express server and port exposure

const express = require('express');
const cors = require('cors');
const mongoose = require('./mongoose');
const productRoutes = require('./routes/productRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



app.use('/api/product', productRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
