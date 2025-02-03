import NotificationInterface from "../@interfaces/notification";
import { sql } from "../server";

export const getAllNotificationsService = async (): Promise<
  NotificationInterface[]
> => {
  try {
    const query = await sql<NotificationInterface[]>`
    SELECT
      id,
      username,
      type,
      created_at,
      read::boolean AS read  -- Explicitly cast the 'read' column to boolean
    FROM notifications
  `;
    return query;
  } catch (error: any) {
    throw new Error(`Database query failed: ${error.message}`);
  }
};
