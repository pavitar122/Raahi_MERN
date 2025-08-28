import { useEffect, useState } from 'react';
import { requestNotificationPermission, registerServiceWorker, subscribeToPush } from '../utils/pushNotifications';

const PushNotificationManager = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    initializePushNotifications();
  }, []);

  const initializePushNotifications = async () => {
    // Register service worker
    await registerServiceWorker();
    
    // Check current subscription status
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    setIsSubscribed(!!subscription);
  };

  const handleSubscribe = async () => {
    const hasPermission = await requestNotificationPermission();
    
    if (!hasPermission) {
      alert('Please allow notifications to receive push notifications');
      return;
    }

    try {
      const subscription = await subscribeToPush();
      
      if (subscription) {
        // Send subscription to backend
        const response = await fetch('/api/push/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscription }),
        });

        if (response.ok) {
          setIsSubscribed(true);
          alert('Successfully subscribed to push notifications!');
        }
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        
        // Notify backend about unsubscribe
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        
        setIsSubscribed(false);
        alert('Unsubscribed from push notifications');
      }
    } catch (error) {
      console.error('Unsubscription failed:', error);
    }
  };

  return (
    <div>
      <h3>Push Notifications</h3>
      {isSubscribed ? (
        <button onClick={handleUnsubscribe}>Disable Notifications</button>
      ) : (
        <button onClick={handleSubscribe}>Enable Notifications</button>
      )}
    </div>
  );
};

export default PushNotificationManager;