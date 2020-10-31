const express = require("express");
const Habit = require("../models/habits.model");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/habits", auth, async (req, res) => {
  const habit = new Habit({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await habit.save();
    res.status(201).send(habit);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/habits", auth, async (req, res) => {
  try {
    await req.user.populate({ path: "habits" }).execPopulate();
    res.send(req.user.habits);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/habits/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      ouwner: req.user._id,
    });
    if (!habit) return res.status(404).send();

    res.send(habit);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("habits/:id", auth, async (req, res) => {
  const updates = Objext.keys(req.body);
  const allowed = ["history"];
  const isValid = updates.every((update) => allowed.includes(update));

  if (!isValid) return res.status(400).send({ error: "Invalid Updates" });

  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      ouwner: req.user._id,
    });
    if (!habit) return res.status(404).send();

    updates.forEach((update) => (habit[update] = req.body[update]));
    await habit.save();
    res.send(habit);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/habits/:id", auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!habit) res.status(404).send();

    res.send(habit);
  } catch (error) {
    res.status(50).send();
  }
});

module.exports = router;
