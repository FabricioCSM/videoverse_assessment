import { formatDistanceToNow } from "date-fns";

interface NotificationDateProps {
  date: string;
}

const NotificationDate = ({ date }: NotificationDateProps) => {
  const parsedDate = new Date(date);
  const timeAgo = formatDistanceToNow(parsedDate, { addSuffix: true });

  return (
    <div>
      <p className="text-blue-400">{timeAgo}</p>
    </div>
  );
};

export default NotificationDate;
