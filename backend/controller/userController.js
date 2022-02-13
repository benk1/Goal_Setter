const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');
const auth = require('../middleware/auth');

//@desc Get user data
//@route GET  /api/users/me
//@access Public
const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});
//@desc Create a new user
//@route POST  /api/users
//@access Public
const createUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();
	res
		.header('x-auth-token', token)
		.send(_.pick(user, ['_id', 'name', 'email']));
});

//@desc Login a new user
//@route POST  /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await bcrypt.compare(password, user.password))) {
		res.send({
			_id: user.id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400);
		throw new Error('Invalid Credentials');
	}
});

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});

	return schema.validate(user);
}

//Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};
module.exports = {
	createUser,
	getUser,
	loginUser,
};
