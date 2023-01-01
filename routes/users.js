const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require('../models/Post');


//UPDATE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {

        if (req.body.password) {

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);

        }
        try {

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true });

            res.status(200).json(updatedUser);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message })
        }
    } else {
        res.status(401).json("Editing someone else's account not allowed.")
    }
});

//DELETE
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({
                    username: user.username,
                });
                // above lines will check for username in the posts and delete all posts with this username. 

                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User deleted successfully.")
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: error.message })
            }
        } catch (error) {
            console.log(error);
            res.status(404).json({ error: error.message })
        }

    } else {
        res.status(401).json("Deleting someone else's account not allowed.")
    }
});

// GET USER
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
});

module.exports = router