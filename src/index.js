import express from 'express';
import {MongoClient} from 'mongodb';

const app = express();

let db;
let col;
const dbUrl = 'mongodb://localhost:27017'; // TODO: make env var?
try {
    const client = await MongoClient.connect(dbUrl);
    db = client.db('momentum');
    col = db.collection('habitHistory');
} catch (err) {
    console.error('Error connection to DB', err);
}


// no real use case for this, probably will remove
app.get('/habits', (req, res) => {
    try {
        res.send(await col.find({}));
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/habits:user', (req, res) => {
    const user = req.params.user;

    try {
        const habits = await col.find({user});
        if (!habits) {
            return res.status(404).send();
        }
        res.send(habits);
    } catch(err) {
        res.status(500).send(err);
    }
});

app.post('/habits', async (req, res) => {
    const habit = req.body;
    try {
        await col.insertOne(habit);
        res.status(201).send(habit);
    } catch (err) {
        res.status(400).send(err);
    }  
});
