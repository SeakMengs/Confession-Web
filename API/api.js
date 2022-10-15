const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5500
const router = express.Router()

//* import from other folders------------------------------------------------------------------------------------
const routerModule = require('./routers/router')
app.use(routerModule)

// const postModel = require('./models/models')
//*------------------------------------------------------------------------------------

// ? connect db server
mongoose.connect(process.env.databaseUrl, {useNewUrlParser: true}, () => {
    console.log("Connected to mongodb database server")
})

app.get('/', (res) => {
    res.setEncoding("We are on home");
})
// ? middleware to tell express that the server accept json
app.use(express.json())
app.use(router)

// ? run api on port
app.listen(port, () => {
    console.log(`Listening to port ${port} `)
})