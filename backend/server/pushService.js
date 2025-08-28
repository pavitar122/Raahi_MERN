import webpush from 'web-push';

// Initialize web-push with VAPID keys
const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY
};

webpush.setVapidDetails(
  process.env.VAPID_MAILTO,
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// In-memory storage (replace with database in production)
const subscriptions = new Map();

class PushService {
  // Store subscription
  addSubscription(userId, subscription) {
    subscriptions.set(subscription.endpoint, {
      userId,
      subscription,
      createdAt: new Date()
    });
  }

  // Remove subscription
  removeSubscription(endpoint) {
    subscriptions.delete(endpoint);
  }

  // Send notification to all subscribers
  async sendNotificationToAll(payload) {
    const results = [];
    
    for (const [endpoint, subData] of subscriptions) {
      try {
        const result = await webpush.sendNotification(
          subData.subscription,
          JSON.stringify(payload)
        );
        results.push({ endpoint, success: true, result });
      } catch (error) {
        console.error('Error sending notification:', error);
        // Remove invalid subscriptions
        if (error.statusCode === 410) { // Gone
          this.removeSubscription(endpoint);
        }
        results.push({ endpoint, success: false, error: error.message });
      }
    }
    
    return results;
  }

  // Send notification to specific user
  async sendNotificationToUser(userId, payload) {
    const userSubscriptions = Array.from(subscriptions.values())
      .filter(sub => sub.userId === userId);
    
    const results = [];
    
    for (const subData of userSubscriptions) {
      try {
        const result = await webpush.sendNotification(
          subData.subscription,
          JSON.stringify(payload)
        );
        results.push({ endpoint: subData.subscription.endpoint, success: true, result });
      } catch (error) {
        console.error('Error sending notification:', error);
        if (error.statusCode === 410) {
          this.removeSubscription(subData.subscription.endpoint);
        }
        results.push({ endpoint: subData.subscription.endpoint, success: false, error: error.message });
      }
    }
    
    return results;
  }

  // Generate VAPID keys (run once)
  static generateVapidKeys() {
    return webpush.generateVAPIDKeys();
  }
}

export default new PushService();