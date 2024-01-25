import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

import axios, { AxiosInstance } from "axios";

//TS Module Interface
declare module "fastify" {
  interface FastifyInstance {
    request: FastifyRequest;
    reply: FastifyReply;
    axios: AxiosInstance;
  }
}

//Instancing fastify
const app: FastifyInstance = fastify({
  logger: true,
  ajv: { customOptions: { coerceTypes: true } },
});

// Registering @Fastify/Cors
app.register(require("@fastify/cors"), require("./configs/corsConfig"));
app.log.info("Registered => @fastify/cors");
// Registering @Fastify/Swagger
app.register(require("@fastify/swagger"));
app.register(require("@fastify/swagger-ui"), require("./configs/swaggerConfig")
);
app.log.info("Registered => @fastify/swagger");

// Registering @Axios
app.decorate("axios", axios);
app.log.info("Registered => @fastify/axios");

//Registering Routes

app.get("/", async (request, reply) => {
  reply.code(200).send({ status: true, message: "Welcome to Smart Stock Tracker API - Service Wallet" });
});

app.get("/ping", async (request, reply) => {
  reply.code(200).send({ status: true, message: "Pong!" });
});

app.register(require('./controllers/cryptos'), {prefix: "/api/wallet/v1/coin"})


export { app };
