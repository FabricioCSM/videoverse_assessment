export const getAllNotifications = async () => {
  const response = await fetch("http://localhost:3333/notifications");
  console.log(response);
  const notifications = await response.json();
  return notifications;
};
