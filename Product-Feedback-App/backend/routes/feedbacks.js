const express = require('express');
const checkAuth = require('../middleware/check-auth');
const FeedbackControllers = require('../controllers/feedback');
const router = express.Router();

router.post('', checkAuth, FeedbackControllers.createFeedback);
router.post('/:id/comments', checkAuth, FeedbackControllers.createComment);

router.delete('/:id', checkAuth, FeedbackControllers.deleteFeedback);

router.patch('/:id', checkAuth, FeedbackControllers.editFeedback);
router.patch('/upvotes/:id', checkAuth, FeedbackControllers.upvoteFeedback);

router.get('', FeedbackControllers.getAllFeedbacks);
router.get('/status', FeedbackControllers.getFeedbacksByStatus);
router.get('/:id', FeedbackControllers.getFeedback);

module.exports = router;