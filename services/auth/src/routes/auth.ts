import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const authSchema = require("../models/authModel");

interface Body {
  userEmail: string;
  userPassword: string;
}

async function auth(app: FastifyInstance, request: FastifyRequest, reply: FastifyReply, options: any, done: () => void) {
  app.post("/auth", authSchema, async (request, reply) => {
    try {
      const { userEmail, userPassword } = request.body as Body;

      if (!userEmail || !userPassword) {
        return reply.status(400).send({ status: false, message: "Email or password is missing" });
      }

      const userExists = await app.prisma.user.findFirst({
        where: {
          email: userEmail,
        },
      });

      if(!userExists) return reply.status(400).send({ status: false, message: "Email or password is missing" });
       
      const token = app.jwt.hash({id: userExists.id}, process.env.SECRETE);

      if(userExists.password !== null){
        const passwordMatch = await app.bcrypt.compare(userPassword, userExists.password);
        if(passwordMatch){
          reply.status(200).send({status: true, id: userExists.id, token});
        }else{
          reply.status(400).send({status: false, message: "Wrong password"});
        }
      }else{
        reply.status(200).send({status: true, id: userExists.id, token});
      }  

    } catch (err) {
      console.log("Error during authentication: " + err);
      reply.status(500).send({status: false, message: "Something went wrond during authentication"});
    }
    done();
  });
}

module.exports = auth;
