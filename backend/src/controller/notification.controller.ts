import { FastifyReply, FastifyRequest } from "fastify";
import NotificationInterface from "../@interfaces/notification";
import { getAllNotificationsService } from "../service/notification.service";

export const getAllNotifications = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const notifications: NotificationInterface[] =
      await getAllNotificationsService();
    reply.send(notifications);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch notifications", msg: error });
  }
};
