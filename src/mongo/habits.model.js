const mongoose = require('mongoose');

const habitSchema = mongoose.Schema('Habit', {    
    username: {
        type: String,
        required: true,
    },
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
    history: {
        type: Array,
        default: [],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;