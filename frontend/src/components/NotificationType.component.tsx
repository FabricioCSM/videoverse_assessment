interface NotificationTypeProps {
  type: string;
}

const NotificationType = ({ type }: NotificationTypeProps) => {
  return (
    <>
      {type === "friend_request" && (
        <div>
          <p>sent you a friend request.</p>
        </div>
      )}
      {type === "follow_update_accept" && (
        <div>
          <p>is now following you!</p>
        </div>
      )}
      {type === "follow_update_reject" && (
        <div>
          <p>you ignored the request.</p>
        </div>
      )}
      {type === "new_posts" && (
        <div>
          <p>made a new post, go check it out!</p>
        </div>
      )}
      {type === "new_content" && (
        <div>
          <p>posted a new video</p>
        </div>
      )}
      {type === "birthday" && (
        <div>
          <p>birthday is today!</p>
        </div>
      )}
      {type === "update" && (
        <div>
          <p>posted an update</p>
        </div>
      )}
    </>
  );
};

export default NotificationType;
