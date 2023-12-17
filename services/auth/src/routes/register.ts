import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

const signupSchema = require("../models/signupModel");


async function registerRoutes(app: FastifyInstance, request: FastifyRequest, options: any, reply: FastifyReply, done: () => void) {
    
    app.post("/register", signupSchema, async (request, reply) => {
        try {
            const { email, password, passwordVerification } = request.body as {
                email: string;
                password: string;
                passwordVerification: string;
            };

            if(!email || !password || !passwordVerification || password !== passwordVerification) 
                return reply.status(400).send({status: false, message: "Passwords don't match"});    

            const userExists = await app.prisma.user.findUnique({
                    where: {email},
                });

            if(userExists) return reply.status(400).send({status: false, message: "User already registered"});   
            
            const hashedPassword = await app.bcrypt.hash(password, 12);           

            const user = {                
                email,
                password: hashedPassword,
            }  
        
            const registerUser = await app.prisma.user.create({data: user});       

           if(!registerUser){
                reply.status(402).send({status: false, message: "Error to register the user"})
           } else{             
                const token = await app.jwt.sign({ id: registerUser.id}, process.env.SECRET);  
                
                if(!registerUser){
                    reply.status(402).send({status: false, message: "Query error to register the user"})
                } else{
                    reply.status(200).send({status: true, id: registerUser.id, token})
                }
           }                   

        } catch(err) {
            reply.status(500).send({status: false, message: 'Something went wrong when creating the user.' });
        }
        done();
    });
    
}

module.exports = registerRoutes;