const express = require('express'); //common JS syntax and easier to use in backend without adding extra steps
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')

router.get('/', getGoals)

router.post('/', setGoal)

//alternatively chain them 
    // router.route('/'). get(getGoals).post(setGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router