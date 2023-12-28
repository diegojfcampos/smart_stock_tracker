import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

//Firebase admin instance and configs

const firebaseAdmin = require("firebase-admin");
const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: "smart-stock-tracker",
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  };


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
                      phoneNumber: decodedToken.phone_number,
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
