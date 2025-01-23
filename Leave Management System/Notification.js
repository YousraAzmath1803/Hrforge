import { useState, useEffect } from 'react';
import styles from './Notification.module.css';

export default function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`${styles.notification} ${visible ? styles.visible : ''}`}>
      {message}
    </div>
  );
}
