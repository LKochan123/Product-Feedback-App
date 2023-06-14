const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

router.post('', async (req, res, next) => {
    
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

router.delete('/:id', async (req, res, next) => {
    
    try {
        await Feedback.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Post deleted!'
        });
    } catch {
        //
    }
})

router.patch('/:id', async (req, res, next) => {
    try {
        const feedback = await Feedback.findById({ _id: req.params.id });
        if (!feedback) {
            res.status(404).json({
                message: 'Feedback not found!'
            })
        }

        feedback.title = req.body.title;
        feedback.category = req.body.category;
        feedback.upvotes = req.body.upvotes;
        feedback.status = req.body.status;
        feedback.description = req.body.description;
        await feedback.save();

        res.status(200).json({
            message: 'Update succesfull!'
        })

    } catch {
        res.status(500).json({
            message: 'An error occurred!'
        });
    }
})

router.get('/status', async (req, res, next) => {
    const status = req.query.status;
    try {
        const feedbacks = await Feedback.find({ status: status });
        const countFeedbacks = await Feedback.countDocuments({ status: status });
        res.status(200).json({
            message: `Feedbacks with status '${status}' fetched!`,
            feedbacks: feedbacks,
            occurance: countFeedbacks
        })
    } catch(error) {
        res.status(500).json({
            message: "ERROR OCCURED!",
            error: error
        });
    }
})

router.get('/:id', async (req, res, next) => {
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

router.get('', async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        const countAll = await Feedback.countDocuments();
        res.status(200).json({
            message: 'All feedbacks fetched!',
            feedbacks: feedbacks,
            occurance: countAll
        })
    } catch {
        res.status(404).json({
            message: 'Feedbacks not found!'
        })
    }
});

module.exports = router;