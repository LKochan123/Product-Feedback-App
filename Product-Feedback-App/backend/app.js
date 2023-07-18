const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedbacks');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comments');

const app = express();

async function connectToMongoDB() {
    DB_URL = `mongodb+srv://lukaszek2302:${process.env.MONGO_ATLAS_PASSWORD}@pfa-cluster.phq9gtd.mongodb.net/node-angular`;
    try {
        await mongoose.connect(DB_URL);
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
        'Origin, X-Requested-With, Contetnt-Type, Accept, Authorization'
    );
    res.setHeader(
        'Acces-Control-Allow-Methods', 
        'GET, POST, DELETE, PUT, PATCH, OPTIONS'
    );
    next();
});

app.use('/feedbacks', feedbackRoutes);
app.use('/user', userRoutes);
app.use('/comment', commentRoutes);

module.exports = app;