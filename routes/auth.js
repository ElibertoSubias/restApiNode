const { required } = require('@hapi/joi');
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    // VALIDATE THE DATA FROM THE USER
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const saveUser = await user.save();
        res.json({user: user._id});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});

// Login
router.post('/login', async (req, res) => {
    // VALIDATE THE DATA FROM THE USER
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});

    // Check if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    // if (!user) return res.status(400).send('Email or password is wrong');
    if (!user) return res.status(400).json({message:"Email or password is wrong"})

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);

    // if (!validPass) return res.status(400).send({ error: 'Email or password is wrong!' });
    if (!validPass) return res.status(400).json({message:"Email or password is wrong"})

    // Create and asign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({token: token});

    // res.send('Logged in!');

});

module.exports = router;