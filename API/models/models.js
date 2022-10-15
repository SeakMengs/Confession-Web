const mongoose = require('mongoose')

const  postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    pin: {
        type: String,
        required: false
    },
    impostorId: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: Date.now
    }
})

// * it takes two properties, name of our model and Schema
module.exports = mongoose.model('post', postSchema )