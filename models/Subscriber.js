const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['active', 'unsubscribed', 'pending'],
        default: 'active'
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    },
    lastEmailSent: {
        type: Date
    },
    interests: [{
        type: String
    }],
    metadata: {
        type: Map,
        of: String
    }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);