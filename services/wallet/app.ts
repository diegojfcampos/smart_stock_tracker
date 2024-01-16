import { app } from './src/server'
const port =  3016


const server = async () =>{
    try{
        await app.listen({port});
    }catch(err){
        console.log("Error to start the server => " + err);
        process.exit(1);
    }
}

server();