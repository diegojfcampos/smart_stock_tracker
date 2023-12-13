import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

//Firebase admin instance and configs

const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("/home/diego/Desktop/Studies/CLOUD/smart-stock-tracker-firebase-adminsdk-p4x6a-e49badda11.json");

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
                      userName: decodedToken.name,
                      phoneNumber: decodedToken.phone_number                                           
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
            reply.status(500).send({success: false, mensage: "Error to authenticade token"})           
            
        }
        done();
    })
 
   
}

module.exports = firebaseAuth;
