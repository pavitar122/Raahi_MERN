import express from 'express';
import pushService from '../server/pushService.js';

const router = express.Router();

// Subscribe endpoint
router.post('/subscribe', async (req, res) => {
  try {
    const { subscription, userId = 'anonymous' } = req.body;

    if (!subscription) {
      return res.status(400).json({ error: 'Subscription is required' });
    }

    pushService.addSubscription(userId, subscription);

    res.json({
      success: true,
      message: 'Subscription saved successfully'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Unsubscribe endpoint
router.post('/unsubscribe', (req, res) => {
  try {
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Endpoint is required' });
    }

    pushService.removeSubscription(endpoint);

    res.json({
      success: true,
      message: 'Unsubscribed successfully'
    });
  } catch (error) {
    console.error('Unsubscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send notification to all users
router.post('/send-to-all', async (req, res) => {
  try {
    const { title, body, url } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }

    const payload = {
      title,
      body,
      url: url || '/',
      icon: '/icon-192x192.png'
    };

    const results = await pushService.sendNotificationToAll(payload);

    res.json({
      success: true,
      message: `Notifications sent to ${results.filter(r => r.success).length} devices`,
      results
    });
  } catch (error) {
    console.error('Send notification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send notification to specific user
router.post('/send-to-user', async (req, res) => {
  try {
    const { userId, title, body, url } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({ error: 'UserId, title, and body are required' });
    }

    const payload = {
      title,
      body,
      url: url || '/',
      icon: '/icon-192x192.png'
    };

    const results = await pushService.sendNotificationToUser(userId, payload);

    res.json({
      success: true,
      message: `Notifications sent to user ${userId}`,
      results
    });
  } catch (error) {
    console.error('Send user notification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get VAPID public key
router.get('/vapid-public-key', (req, res) => {
  res.json({
    publicKey: process.env.VAPID_PUBLIC_KEY
  });
});

export default router;