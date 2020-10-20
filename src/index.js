import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();

const dbUrl = 'mongodb://localhost:27017/mydb'; // TODO: make env var?
try {
    await MongoClient.connect(url);
} catch (err) {
    console.error('Error connection to DB', err);
}



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