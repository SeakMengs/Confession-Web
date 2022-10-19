const mongoose = require('mongoose')

const  postSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: false
        },
        image: {
            type: String,
            required: false
        },
        upvote: {
            type: Number,
            required: false
        },
        downvote: {
            type: Number,
            required: false
        },
        share: {
            type: Number,
            required: false
        },
        comment: [
            {
                comments: {
                    type: String,
                    require: false
                }
            }

        ],
        pin: {
            type: String,
            required: false
        },
        impostorId: {
            type: String,
            required: true
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