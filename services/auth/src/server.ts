// server.ts

import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import { PrismaClient } from "@prisma/client";
import bcryptInstance from "bcrypt";

const prisma = new PrismaClient({ log: ["query", "info", "warn"] });

const {
  prometheus,
  totalRequestsCounter,
} = require("./configs/prometheusMetrics");

const jwt = require("@fastify/jwt");
const uuid = require("uuid");

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    request: FastifyRequest;
    reply: FastifyReply;
    bcrypt: typeof bcryptInstance;
    prometheus: typeof prometheus;
    uuid: typeof uuid;
    jwt: typeof jwt;
  }
}

const app: FastifyInstance = fastify({
  logger: true,
  ajv: { customOptions: { coerceTypes: true } },
});

// Registering Metrics with Prometheus
prometheus.collectDefaultMetrics();
app.log.info("Registered => @prometheus");

// Registering @Fastify/Cors
app.register(require("@fastify/cors"), require("./configs/corsConfig"));
app.log.info("Registered => @fastify/cors");

// Decorating @Bcrypt
app.decorate("bcrypt", bcryptInstance);
app.log.info("Registered => @bcrypt");

// Decorating @Bcrypt
app.decorate("uuid", uuid);
app.log.info("Registered => @uuid");

// Decorating @Prisma
app.decorate("prisma", prisma);
app.log.info("Registered => @prisma");

// Registering @Fastify/Env
app.register(require("@fastify/env"), require("./configs/envConfig"));
app.log.info("Registered => @fastify/env");

// Registering @Fastify/Jwt
app.register(jwt, {
  secret: process.env.SECRET,
  sign: { expiresIn: "2h" },
});
app.log.info("Registered => @fastify/jwt");

// Registering @Fastify/Swagger
app.register(require("@fastify/swagger"));
app.register(
  require("@fastify/swagger-ui"),
  require("./configs/swaggerConfig")
);
app.log.info("Registered => @fastify/swagger");

/*
 Register Routes
 */
app.get("/", async (request, reply) => {
  totalRequestsCounter.inc();
  reply.send({ Server_Status: "SERVER RUNNING" });
});

app.get("/metric", async (request, reply) => {
  const metrics = await prometheus.register.metrics();
  reply.header("Content-Type", prometheus.register.contentType);
  reply.send(metrics);
});

app.register(require("./controllers/register"), { prefix: "/api/v1" });
app.register(require("./controllers/firebase-auth"), { prefix: "/api/v1" });
app.register(require("./controllers/auth"), { prefix: "/api/v1" });
app.register(require("./controllers/user"), { prefix: "/api/v1" });

export { app };
