import express from 'express';
import Habits from './habits.model';

const app = express();

app.get('/habits', (req, res) => {
    try {
        res.send(await Habits.find({}));
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/habits:key', (req, res) => {
    const key = req.params.key;

    try {
        const habit = await Habit.findById(key);
        if (!habit) {
            return res.status(404).send();
        }
        res.send(habit);
    } catch(err) {
        res.status(500).send(err);
    }
});

app.post('/habits', async (req, res) => {
    const habit = new Habits(req.body);
    try {
        await habit.save();
        res.status(201).send(habit);
    } catch (err) {
        res.status(400).send(err);
    }
  
});