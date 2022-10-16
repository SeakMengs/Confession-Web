const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
// ? request models
const postModel = require('../models/models')
// const url = "http://localhost:5500"

//Give all post info
router.get(`/`, async(req, res) => {
    try {
        const allPost = await postModel.find()
        res.json(allPost);
    } catch (err) {
        res.json({ message: err.message})
    }
    // res.send("Hello hey")
})

//Give post by id
router.get('/post/byID/:impostorId', async (req, res) => {
    // ? find by id
    //*example http://www.yato.com/253
    //* 253 is params
    postModel.findOne({impostorId: req.params.impostorId}, (err, post) => {
        if (post != null) {
            res.json(post)
        } else {
            res.send("ID not found")
        }
    })
})

//Give post by ids
router.get('/post/byIDs/:impostorId', async (req, res) => {
    // ? find by id
    //*example http://www.yato.com/253
    //* 253 is params
    try {
        postModel.find({impostorId: req.params.impostorId}, (err, post) => {
            if (post != null) {
                res.json(post)
            } else if (post == null) {
                res.status(404).send("IDs not found")
            }
        })
    } catch (err) {
        res.json({ message: err.message})
    }
})

//Post content to api
router.post(`/hey`, bodyParser.json(), async (req, res) => {
    const newPost = new postModel(
        {
            text: req.body.text,
            image: req.body.image,
            comment: req.body.comment,
            pin: req.body.pin,
            impostorId: req.body.impostorId
        }
    )

    // ? save post
    try {
        const savePost = await newPost.save()
        res.status(201).json(savePost)
    } catch (err) {
        //* status(400) = bad data, fail to accept (not full required information)
        res.status(400).json({ message: err.message })
    }
})

//Update data
router.patch("/", bodyParser.json(), async(req, res) => {
    try {
        const updatePost = await postModel.updateOne(
            { _id: req.params._id },
            {
                $set:
                {
                    text: req.body.text,
                    image: req.body.image,
                    comment: req.body.comment,
                    pin: req.body.pin,
                    impostorId: req.body.impostorId
                }
            }
        )
        res.json(updatePost)
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.delete(`/post/byID/:impostorId`, async(req, res) => {
    try {
        const removePost = await postModel.deleteOne({impostorId: req.params.impostorId})
        res.json({ message: 'Remove successfully' })
    } catch (err) {
        res.json({ message: err.message })
    }
})

router.get("*", (req, res) => {
    res.send("This api route does not exist!");
})

app.use(router)
module.exports = router;