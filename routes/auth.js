const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//REGISTER
router.post('/register', async (req, res) => {
    try {
        
        //? using Bcrypt

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //??????????????????/

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json("User created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });

        !user && res.status(400).json("Invalid credentials"); 

        const validate = await bcrypt.compare(req.body.password, user.password);

        !validate && res.status(400).json("Invalid credentials");

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message})
    }
});


module.exports = router;