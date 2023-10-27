const formatNotification = (notification) => {
  switch (notification.type) {
    case "order_placed":
      return {
        title: notification.message,
        label: notification.button,
      };
  }
  return;
};

export default formatNotification;
