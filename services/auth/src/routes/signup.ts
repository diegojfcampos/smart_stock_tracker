import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
const signupSchema = require("../models/signupModel");


async function register(app: FastifyInstance, request: FastifyRequest, options: any, reply: FastifyReply, done: () => void) {
   
    app.post("/register", signupSchema, async (request, reply) => {
        try {
            const { email, password, passwordVerification } = request.body as {
                email: string;
                password: string;
                passwordVerification: string;
            };

            // Restante do seu código

        } catch(err) {
            reply.status(500).send({ error: 'Something went wrong when creating the user.' });
        }
    });
}
