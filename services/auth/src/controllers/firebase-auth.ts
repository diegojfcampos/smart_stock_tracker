import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

//Firebase admin instance and configs

const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("/home/diego/Desktop/DOCS/CLOUD/firebaseKey.json")


firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});

const firebaseAuthSchema = require("../models/firebaseAuthModel")

async function firebaseAuth(app: FastifyInstance,  request: FastifyRequest, options: any, reply: FastifyReply, done: () => void){
    
    app.post("/firebase-auth", firebaseAuthSchema, async (request, reply) =>{ 

        try{
            const idToken = request.body;
            const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);           

            const email =  decodedToken.email;

            const checkUser = await app.prisma.user.findUnique({
                where: {email},
            });           
           
            const newToken = app.jwt.sign({id: checkUser?.id}, process.env.SECRET);

            if(checkUser) {                
                reply.status(200).send({status: true, id: checkUser.id, newToken });
            }else{
                const newUser = await app.prisma.user.create({
                    data: {
                      email: decodedToken.email, 
                      firebase: true                                           
                    },
                });

                if(newUser){
                    reply.status(200).send({ status: true, id: newUser.id, newToken });
                }else{
                    reply.status(400).send( { status: false, message: "Error to register user" } );
                }
            }
        
        }catch(err){
            console.log("Error to authenticade: " + err);
            reply.status(500).send({status: false, mensage: "Error to authenticade token"})           
        
        }
        
    })
 
   
}

module.exports = firebaseAuth;
