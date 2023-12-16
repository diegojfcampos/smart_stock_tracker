import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const authMiddleware = async (app: FastifyInstance, request: FastifyRequest, reply: FastifyReply) =>{

    const authHeader = request.headers['authorization'];

    if(!authHeader) return reply.status(400).send({status: false, message: "Unauthorized - Token missing"})

    const token = authHeader && authHeader.split(" ")[1];

    try{
        const decodedToken = await app.jwt.verify(token, process.env.SECRET);
        if(!decodedToken){
            reply.status(500).send({status:false, message:'Unauthorized - Invalid token'})
        }else{
            reply.code(200);
        }

    }catch(err){
        console.log('Unauthorized - Invalid token: ' + err);
        reply.status(500).send({status:false, message:'Unauthorized - Invalid token'})
    }

}

module.exports = authMiddleware;