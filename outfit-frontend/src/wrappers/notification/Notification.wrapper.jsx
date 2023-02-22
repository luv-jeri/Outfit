import { useState, createContext, useContext, useEffect } from 'react';
import s from './Notification.module.css';

const NotificationCard = ({ notification }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`${s.flyer} ${show ? s.slide_in : s.slide_out}  `}
      style={{
        backgroundColor: notification.type === 'error' ? '#EB455F' : '#7DB9B6',
      }}
    >
      <h6 className={s.notification__title}>{notification.title}</h6>
      <p className={s.notification__message}>{notification.message}</p>
    </div>
  );
};

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (notification) => {
    const id = Math.random().toString(36).substr(2, 9);
    // const to_add = { ...notification, id };
    // setNotifications([...notifications, to_add]);

    setNotifications((prev) => {
      return [...prev, { ...notification, id }];
    });
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => {
          return prev.filter((item) => item.id !== notifications[0].id);
        });
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notifications]);

  const value = {
    showNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      <div className={s.notification__panel}>
        {notifications.map((item, index) => (
          <NotificationCard key={item.id || index} notification={item} />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
