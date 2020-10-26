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
    }    
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;