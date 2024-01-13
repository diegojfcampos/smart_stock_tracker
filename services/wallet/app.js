const server = require('./src/server.js');
const port = 3005

server.listen(3005, (request, reply) =>{
    try{
        console.log(`Server is running on port ${port}`)
    }catch(err){
        console.log(err)
        process.exit(1);
    }
   
  
});