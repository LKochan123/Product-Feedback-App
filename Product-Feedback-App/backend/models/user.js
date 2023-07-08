const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    role: { type: String, enum: ['ADMIN', 'MODERATOR', 'USER'], default: 'USER' },
    status: { type: String, enum: ['ACTIVE', 'BANNED'], default: 'ACTIVE' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);