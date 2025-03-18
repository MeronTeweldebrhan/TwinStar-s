const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// Add new subscriber
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        
        // Check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.status === 'unsubscribed') {
                existingSubscriber.status = 'active';
                await existingSubscriber.save();
                return res.status(200).json({ message: 'Subscription reactivated successfully' });
            }
            return res.status(400).json({ message: 'Email already subscribed' });
        }

        // Create new subscriber
        const subscriber = new Subscriber({
            email,
            interests: req.body.interests || [],
            metadata: req.body.metadata || {}
        });

        await subscriber.save();
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing subscription', error: error.message });
    }
});

// Unsubscribe
router.post('/unsubscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = await Subscriber.findOne({ email });
        
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        subscriber.status = 'unsubscribed';
        await subscriber.save();
        res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing unsubscription', error: error.message });
    }
});

// Get all subscribers (with optional filtering)
router.get('/', async (req, res) => {
    try {
        const { status, interest } = req.query;
        let query = {};
        
        if (status) query.status = status;
        if (interest) query.interests = interest;

        const subscribers = await Subscriber.find(query);
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscribers', error: error.message });
    }
});

// Update subscriber details
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        
        const subscriber = await Subscriber.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        );

        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        res.status(200).json(subscriber);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subscriber', error: error.message });
    }
});

module.exports = router;