const { Mongoose } = require("mongoose");
const Post = require("../models/Post");

const store = (req, res, next) => {
    let post = new Post({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    })
    post.save()
    .then(response => {
        res.json({
            message: 'Post Add Successfully!'
        })
    })
    .catch(error => {
        console.log(error);
        res.json({
            message: 'An error Ocurred!'
        });
    })
}

module.exports = store;