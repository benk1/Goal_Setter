const Joi = require('joi');
const asyncHandler = require('express-async-handler');
//@desc Get goals
//@route GET  /api/goals
//@access Private
const getGoals = async (req, res) => {
	res.status(200).send({ message: 'Get goals' });
};

//@desc Create goals
//@route POST  /api/goals
//@access Private
const createGoal = asyncHandler(async (req, res) => {
	const { error } = validateGoal(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	const result = schema.validate(req.body);
	console.log(result);
	if (result.error) {
		res.status(400).send(result.error.details[0].message);
		return;
	}
	res.status(200).send({ message: 'Create goal' });
});

//@desc Update goals
//@route PUT  /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const { error } = validateGoal(req.body);
	if (error) {
		res.status(400).send(error.details[0].message);
		return;
	}
	res.status(200).send({ message: `Update goal ${id}` });
});

//@desc Delete goal
//@route DELETE  /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
	const id = req.params.id;

	res.status(200).send({ message: `Update goal ${id}` });
	res.status(200).send({ message: `Delete goal ${id}` });
});

function validateGoal(goal) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate(goal);
}

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
