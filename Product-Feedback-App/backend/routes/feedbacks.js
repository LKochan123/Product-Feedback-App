const express = require('express');
const Feedback = require('../models/feedback');
const checkAuth = require('../middleware/check-auth');
const Comment = require('../models/comment');

const router = express.Router();

router.post('', checkAuth, async (req, res, next) => {
    try {
        const feedback = new Feedback({
            author: req.userData.id,
            title: req.body.title,
            category: req.body.category,
            upvotes: [],
            status: req.body.status,
            description: req.body.description,
            comments: []
        });
        await feedback.save();    
        res.status(201).json({
            message: 'Post added successfuly!',
        });
    } catch(error) {
        res.status(500).json({
            message: "Couldn't create feedback."
        })
    }
})

router.post('/:id/comments', checkAuth, async (req, res, next) => {
    try {
        const feedbackId = req.params.id;
    
        const feedback = await Feedback.findById(feedbackId);
        if (!feedback) {
          return res.status(404).json({ message: 'Feedback not found' });
        }
    
        const comment = new Comment({
          author: req.userData.id,
          text: req.body.text,
          subcomments: []
        });
    
        await comment.save();
    
        feedback.comments.push(comment._id);
        await feedback.save();
    
        res.status(201).json({
          message: 'Comment added successfully!',
          comment: comment
        });
      } catch (error) {
        res.status(500).json({ 
            message: "Couldn't post comment to this feedback!" 
        });
      }
})

router.delete('/:id', checkAuth, async (req, res, next) => {
    try {
        const isDeleted = await Feedback.deleteOne({ _id: req.params.id, author: req.userData.id });
        if (isDeleted) {
            res.status(200).json({
                message: 'Post deleted.'
            });
        } else {
            res.status(401).json({
                message: 'Not authorizied!'
            })
        }
    } catch {
        res.status(500).json({
            message: "Couldn't delete feedback."
        })
    }
})

router.patch('/:id', checkAuth, async (req, res, next) => {
    try {
        const feedback = await Feedback.findById({ _id: req.params.id });

        if (feedback.author == req.userData.id) { 
            feedback.title = req.body.title;
            feedback.category = req.body.category;
            feedback.status = req.body.status;
            feedback.description = req.body.description;
            await feedback.save();
    
            res.status(200).json({
                message: 'Update succesfull!'
            })
        } else {
            res.status(401).json({
                message: 'Wrong author of the feedback!'
            }) 
        }
    } catch {
        res.status(500).json({
            message: "Couldn't patch feedback"
        });
    }
})

router.patch('/upvotes/:id', checkAuth, async (req, res, next) => {
    try {
        const feedback = await Feedback.findById({ _id: req.params.id });
        const userID = req.userData.id;
        const idx = feedback.upvotes.indexOf(userID);

        if (idx === -1) { 
            feedback.upvotes.push(userID);
        } else {
            feedback.upvotes.splice(idx, 1);
        }

        await feedback.save();

        res.status(200).json({
            message: 'Upvote updated successfully'
        });

    } catch {
        res.status(500).json({
            message: "Couldn't upvote/downvote on the feedback!"
        })
    }
})

router.get('', async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        const countAll = await Feedback.countDocuments();

        if (feedbacks && countAll) {
            res.status(200).json({
                message: 'All feedbacks fetched!',
                feedbacks: feedbacks,
                occurance: countAll
            })
        } else {
            res.status(404).json({
                message: 'Feedbacks not found!'
            })
        }
    } catch {
        res.status(500).json({
            message: "Couldn't fetched feedbacks."
        })
    }
});

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
            message: "Couldn't fetched feedback with some status.",
        });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const feedback = await Feedback.findById({ _id: req.params.id });
        if (feedback) {
            res.status(200).json({
                message: 'Feedback fetched!',
                feedback: feedback
            })
        } else {
            res.status(404).json({
                message: "Feedback not found!"
            }) 
        }
    } catch {
        res.status(500).json({
            message: "Couldn't fetched this feedback."
        })
    }
})

module.exports = router;