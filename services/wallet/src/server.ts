import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    request: FastifyRequest;
    reply: FastifyReply;
  }
}

const app: FastifyInstance = fastify({
  logger: true,
  ajv: { customOptions: { coerceTypes: true } },
});

export { app };
