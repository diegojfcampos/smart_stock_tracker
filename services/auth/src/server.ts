import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcryptInstance = require("bcrypt");
import { z } from "zod";
const prisma = new PrismaClient({ log: ["query", "info", "warn"] });
const { prometheus, totalRequestsCounter } = require("./configs/prometheusMetrics");
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
    z: typeof z;
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

const start = async () => {
  try {

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

     // Decorating @Zod
    app.decorate("z", z);
    app.log.info("Registered => @zod");

    // Registering @Fastify/Env
    await app.register(require("@fastify/env"), require("./configs/envConfig"));
    app.log.info("Registered => @fastify/env");

    // Registering @Fastify/Jwt
    await app.register(jwt, {
      secret: process.env.SECRET,
      sign: { expiresIn: "2h" },
    });
    app.log.info("Registered => @fastify/jwt");

    // Registering @Fastify/Swagger
    await app.register(require("@fastify/swagger"));
    app.register(require("@fastify/swagger-ui"), require("./configs/swaggerConfig"));
    app.log.info("Registered => @fastify/swagger");

    /*
     Register Routes
     */
    app.get("/", async (request, reply) => {
      totalRequestsCounter.inc();
      reply.send({ Server_Status: "Running  => http://0.0.0.0:3003/api/doc" });
    });

    app.get("/metric", async (request, reply) => {
      const metrics = await prometheus.register.metrics();
      reply.header("Content-Type", prometheus.register.contentType);
      reply.send(metrics);
    });

    app.register(require("./routes/signup") , { prefix: '/api' });
    app.register(require("./routes/auth") , { prefix: '/api' });

    await app.listen({ host: "0.0.0.0", port: 3002 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
