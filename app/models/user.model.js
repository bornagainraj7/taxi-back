const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    fullName: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    isDriver: { type: Boolean, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);