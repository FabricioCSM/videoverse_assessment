import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import notificationRoute from "./routes/notification.route";
import "dotenv/config";
import postgres from "postgres";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const URL = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`;
export const sql = postgres(URL, { ssl: "require" });
export const app = fastify();

app.register(fastifyCors, {
  origin: ["*"],
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "videoverse_assessment_api",
      description: "videoverse_assessment API",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(notificationRoute, { prefix: "/notifications" });

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running!");
});
