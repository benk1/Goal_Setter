const express = require('express');
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require('../controller/goalController');
const auth = require('../middleware/auth');
const router = express.Router();

router.route('/').get(auth, getGoals).post(auth, createGoal);
router.route('/:id').put(auth, updateGoal).delete(auth, deleteGoal);

// router.get('/', getGoals);  //We chain get and post together  above

// router.post('/', createGoal);

// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal);

module.exports = router;
