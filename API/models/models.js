const mongoose = require('mongoose')

const  postSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            // required: true,
        },
        image: {
            type: String,
            // required: true,
        },
        comment: {
            type: String,
            // required: true,
        },
        pin: {
            type: String,
            // required: true,
        },
        impostorId: {
            type: String,
            // required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
)

// * it takes two properties, name of our model and Schema
module.exports = mongoose.model('post', postSchema)

// https://stackoverflow.com/questions/58390480/mongodb-collection-name