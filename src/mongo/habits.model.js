const mongoose = require("mongoose");

const habitSchema = mongoose.Schema(
  {
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
    // TODO: make this a sub document?  - https://mongoosejs.com/docs/subdocs.html
    history: [{
      type: String,
    }],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", habitSchema);
module.exports = Habit;
