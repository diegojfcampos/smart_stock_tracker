const express = require('express');
const app = express();

app.get('/',(request, reply ) =>{
    reply.send('SERVER RUNNING');

})

module.exports = app;