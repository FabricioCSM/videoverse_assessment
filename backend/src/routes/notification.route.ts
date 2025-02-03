import { FastifyInstance } from "fastify";
import { getAllNotifications } from "../controller/notification.controller";

export default async function notificationRoute(app: FastifyInstance) {
  app.get(
    "/",
    {
      schema: {
        tags: ["notification"],
        description: "Get all the notifications",
        response: {
          200: {
            description: "A list of notifications",
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "integer" },
                username: { type: "string" },
                type: { type: "string" },
                created_at: { type: "string" },
                read: { type: "boolean" },
              },
            },
          },
        },
      },
    },
    getAllNotifications
  );
}
