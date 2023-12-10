import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { PrismaClient } from "@prisma/client";
import  bcryptInstance = require("bcrypt");
const prisma = new PrismaClient({ log: ["query", "info", "warn"] });

declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
    bcrypt: typeof bcryptInstance;    
  }
}

const app: FastifyInstance = fastify({
  logger: true,
  ajv: { customOptions: { coerceTypes: true } },
});

const start = async () => {
  try {
     //Registering @Fastify/Cors
    app.register(require("@fastify/cors"), {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      credentials: true,
      maxAge: 3600,
    });
    app.log.info("Registered => @fastify/cors");

    //Decorating @Bcrypt
    app.decorate("bcrypt", bcryptInstance);
    app.log.info("Registered => @bCrypt");

    //Decorating @Primas
    app.decorate("prisma", prisma);
    app.log.info("Registered => @prisma");

    //Registering @Fastify/Env
    app.register(require("@fastify/env"), require("./configs/envConfig"));
    app.log.info("Registered => @fastify/env");

     //Registering @Fastify/Jwt
    app.register(require("@fastify/jwt"), {
      secret: process.env.SECRET,
      sign: { expiresIn: "2h" },    }); 
    app.log.info("Registered => @fastify/jwt");

    //Registering @Fastify/Swagger
    await app.register(require("@fastify/swagger"));
    app.register(require("@fastify/swagger-ui"), require("./configs/swaggerConfig"));  
    app.log.info("Registered => @fastify/swagger");

    /*
     Register Routes
     */
    app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
      reply.send({ Server_Status: "Running  => http://0.0.0.0:3003/api/doc" });
    });

    await app.listen({ host: "0.0.0.0", port: 3003 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
