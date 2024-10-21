require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/userRoutes')

const app = express();
app.use(cors({ origin: 'http://127.0.0.1:550'}))
app.use(express.json());

app.use('/api/products', productRoutes);

app.use('/api', userRoutes);

module.exports = app;

