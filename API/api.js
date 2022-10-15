const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5500
const router = express.Router()

app.listen(port, () => {
    console.log(`Listening to port ${port} `)
})