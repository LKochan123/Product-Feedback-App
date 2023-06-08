const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Feedback = require('./models/feedback');
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

app.post('/feedbacks', async (req, res, next) => {
    
    const feedback = new Feedback({
        title: req.body.title,
        category: req.body.category,
        upvotes: req.body.upvotes,
        status: req.body.status,
        description: req.body.description
    });

    await feedback.save();

    res.status(201).json({
        message: 'Post added successfuly!',
    });
})

app.delete('/feedbacks/:id', async (req, res, next) => {
    
    try {
        await Feedback.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Post deleted!'
        });
    } catch {
        //
    }
})

app.put('/feedbacks/:id', async (req, res, next) => {

    const feedback = new Feedback({
        title: req.body.title,
        category: req.body.category,
        upvotes: req.body.upvotes,
        status: req.body.status,
        description: req.body.description
    });

    try {
        await Feedback.updateOne({ _id: req.params.id }, feedback);
        res.status(200).json({
            message: 'Update succesful!'
        })
    } catch {
        res.status(404).json({
            message: 'Some error occured!'
        })
    }
})

app.get('/feedbacks/:id', async (req, res, next) => {
    try {
        const feedback = await Feedback.findById({ _id: req.params.id });
        res.status(200).json({
            message: 'Feedback fetched!',
            feedback: feedback
        })
    } catch {
        res.status(404).json({
            message: "Feedback not found!"
        })
    }
})

app.get('/feedbacks', async (req, res, next) => {

    try {
        const feedbacks = await Feedback.find();
        res.status(200).json({
            message: 'Feedbacks fetched succesful!',
            feedbacks: feedbacks
        });
    } catch {
        //
    }
});

module.exports = app;