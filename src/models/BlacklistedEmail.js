const mongoose = require('mongoose');
const BlacklistedEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    reason: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
    });
module.exports = mongoose.model('BlacklistedEmail', BlacklistedEmailSchema);
