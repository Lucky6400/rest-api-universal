const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// CREATE A PROJECT

router.post('/', async (req, res) => {
    const newPost = new Project(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// UPDATE PROJECTS

router.put('/:id', async (req, res) => {
    try {
        const post = await Project.findById(req.params.id);
        
            try {
                const updatePost = await Project.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, { new: true });
                res.status(200).json(updatePost);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// DELETE PROJECTS

router.delete('/:id', async (req, res) => {
    try {
        const post = await Project.findById(req.params.id);
            try {
                await post.delete();
                res.status(200).json("Post deleted successfully");
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// GET ALL PROJECTS

router.get('/', async (req, res) => {
    try {
        const posts = await Project.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
module.exports = router