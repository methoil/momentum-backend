const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({    
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
    },
    settings: {
        type: String,
        required: false,
    },
    // TODO: define TS or Mongo type for this ??
    history: [{
        type: Date,
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;