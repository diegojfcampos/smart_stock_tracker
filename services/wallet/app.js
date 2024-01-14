const {app} = require("./src/server")
const port = process.env.PORT || 3000

const server = async () =>{
    try{
        server.listen(port);
    }catch(err){
        app.log.error(err);
        process.exit(1);
    }
}

server();

