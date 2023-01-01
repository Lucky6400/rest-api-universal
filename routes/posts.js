const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// CREATE A POST

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// UPDATE POST

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatePost);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(401).json("Access denied");
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// DELETE POST

router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post deleted successfully");
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(401).json("Access denied");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET POST
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// GET ALL POSTS

router.get('/', async (req, res) => {
    const username = req.query.user;
    const category = req.query.category;
    try {
        let posts;
        if(username){
            posts = await Post.find({username});
        } else if (category) {
            posts = await Post.find({categories: {
                $in: [category]
            }});
        } else if (username && category) {
            posts = await Post.find({username, categories: {
                $in: [category]
            }});
        } else {
            posts = await Post.find();
        }
         
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
module.exports = router