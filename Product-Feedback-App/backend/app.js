const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedbacks')
const DB_URL = require('./db')

const app = express();

async function connectToMongoDB() {
    url = DB_URL;
    try {
        await mongoose.connect(url);
        console.log('Connected to DB!');
    } catch {
        console.log('Error!');
    }
}

connectToMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Contetnt-Type, Accept'
    );
    res.setHeader(
        'Acces-Control-Allow-Methods', 
        'GET, POST, DELETE, PUT, OPTIONS'
    );
    next();
});

app.use('/feedbacks', feedbackRoutes);

module.exports = app;