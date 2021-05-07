const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET BACK POSTS
router.get('/', async (req, res) => {
    try {
        const post = await Post.find();
        res.json(post);
    } catch (error) {
        console.log(error)
        res.json({message: error});
    }
});

// POST NEW POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        console.log(post);
        const savePost = await post.save();
        res.json(savePost);       
    } catch (error) {
        console.log(error);
        res.json({ message: error});
    }

});

// SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        const removePost = await Post.remove({ _id: req.params.postId });
        res.json(removePost);
    } catch (error) {
        res.json({
            message: error
        });
    }
});

// Update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: {title: req.body.title}}
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({
            message: error
        })
    }
});

module.exports = router;