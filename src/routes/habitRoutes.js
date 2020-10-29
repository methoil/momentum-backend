const express = require('express')
const Habit = require('../models/habits.model')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/habit', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router;