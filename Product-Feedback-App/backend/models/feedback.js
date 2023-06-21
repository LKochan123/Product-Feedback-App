const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    upvotes: { type: [String], required: true },
    status: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Feedback', feedbackSchema);