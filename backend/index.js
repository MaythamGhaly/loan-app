const express = require('express');
var http = require('http');
require('dotenv').config();
require('./config/db.config')
const app = express();
app.use(express.json());
var server = http.createServer(app);

// let cors = require("cors");
// app.use(cors())

// const authRoutes = require('./routes/auth.routes');
// app.use('/auth', authRoutes)

const UsersRoutes = require('./routes/user.routes');
app.use('/', UsersRoutes)

// const AdminRoutes = require('./routes/admin.routes');
// app.use('/', AdminRoutes)


server.listen(process.env.PORT, (err)=>{
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
})