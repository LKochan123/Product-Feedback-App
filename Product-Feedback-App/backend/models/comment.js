const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true }
})

module.exports = mongoose.model('Comment', commentSchema);