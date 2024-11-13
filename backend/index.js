const express = require('express');
var http = require('http');
require('dotenv').config();
require('./config/db.config')
const app = express();
app.use(express.json());
var server = http.createServer(app);

const UsersRoutes = require('./routes/routes');
app.use('/', UsersRoutes)

server.listen(process.env.PORT, (err)=>{
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
})