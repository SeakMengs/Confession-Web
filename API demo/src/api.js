const postModel = require('./components/models')
const routerModule = require('./components/router')
require('dotenv').config({ path: './src/component/.env' });
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5500
const router = express.Router()
const bodyParser = require('body-parser')
const { response } = require('express');
const serverless = require("serverless-http")
const cors = require('cors')
app.use(cors());
var databaseUrl = ""

// ? connect db server
mongoose.connect(
    databaseUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        if (err) {
            console.warn(err);
        }
        try {
            console.log('Connected to Database');
        } catch (err) {
            throw err
        }
    } 
)
 
//* import from other folders------------------------------------------------------------------------------------
// ? because we use netlify to host api
app.use("/.netlify/functions/api",routerModule)

//*--------------------------------------------------------------------------------------------------------------

    
// ? middleware to tell express that the server accept json
app.use(express.json())
app.use(bodyParser.json())
app.use("/.netlify/functions/api", router)
    
// ? run api on port
// app.listen(port, () => {
//     console.log(`Listening to port ${port} `)
// })

module.exports = app;
module.exports.handler = serverless(app)