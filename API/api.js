require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5500
const router = express.Router()
const bodyParser = require('body-parser')

// ? connect db server
mongoose.connect(
    process.env.databaseUrl,
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
const routerModule = require('./routers/router')
app.use(routerModule)

//*------------------------------------------------------------------------------------

    
// ? middleware to tell express that the server accept json
app.use(express.json())
app.use(bodyParser.json())
app.use(router)
    
    // app.get('/', (req, res) => {
        //     res.send("Hello")
        // })
        
const postModel = require('./models/models')
        // ? run api on port
app.listen(port, () => {
    console.log(`Listening to port ${port} `)
})