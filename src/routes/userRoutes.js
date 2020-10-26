const express = require('express');
const User = require('../mongo/user.model');

const router = new express.Router();

router.post('/users', (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        // sendWelcomeEmail
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const {body, email} = req.body;
        const user = await User.findByCredentials(body, email);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (err) {
        res.status(400).send(err); // send this error back ??
    }
});
