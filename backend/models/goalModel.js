const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true,
	}
);

function validateGoal(goal) {
	const schema = Joi.object({
		text: Joi.string().min(3).required(),
	});

	return schema.validate(goal);
}

module.exports = mongoose.model('Goal', goalSchema);
