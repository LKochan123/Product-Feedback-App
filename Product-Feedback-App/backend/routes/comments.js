const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

router.get('', async (req, res, next) => {
  try {
      const comments = await Comment.find();
      if (!comments) {
        return res.status(404).json({ message: 'Comments not found' });
      }
      res.status(200).json({
          message: 'Comments fetched!',
          comments: comments
      });
    } catch (error) {
      res.status(500).json({
        message: "Couldn't fetched comments." 
      });
    }
})

router.get('/multiple', async (req, res, next) => {
  try {
    const commenIds = req.query.ids.split(',');
    const comments = await Comment.find({ _id: { $in: commenIds } });
    res.status(200).json({
        message: 'Comments to this feedback fetched!',
        comments: comments
    });
  } catch(error) {
    res.status(500).json({
      message: "Couldn't fetched multiple comments."
    });
  }
})

router.get('/:id', async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({
            message: 'Comment fetched!',
            comment: comment
        });
      } catch (error) {
        res.status(500).json({ 
          message: "Couldn't fetched comment" 
        });
      }
})

module.exports = router;