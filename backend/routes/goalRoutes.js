const express = require('express');
const {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
} = require('../controller/goalController');
const router = express.Router();

router.route('/').get(getGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

// router.get('/', getGoals);  //We chain get and post together  above

// router.post('/', createGoal);

// router.put('/:id', updateGoal);

// router.delete('/:id', deleteGoal);

module.exports = router;
