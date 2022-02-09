const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');

//@desc Get goals
//@route GET  /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.send(goals);
});

//@desc Create goals
//@route POST  /api/goals
//@access Private
const createGoal = asyncHandler(async (req, res) => {
	const { error } = validateGoal(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}

	const goal = await Goal.create({
		text: req.body.text,
	});
	res.send(goal);
});

//@desc Update goals
//@route PUT  /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const goal = await Goal.findById(id);
	if (!goal) {
		return res.status(404).send('The Goal with the given ID was not found!!');
	}
	const { error } = validateGoal(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, {
		new: true,
	});
	res.send(updatedGoal);
});

//@desc Delete goal
//@route DELETE  /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const goal = await Goal.findById(id);
	if (!goal) {
		return res.status(404).send('The Goal with the given ID was not found!!');
	}
	await goal.remove();
	res.send({ id: id });
});

function validateGoal(goal) {
	const schema = Joi.object({
		text: Joi.string().min(3).required(),
	});

	return schema.validate(goal);
}

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
