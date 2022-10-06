const express = require('express'); //common JS syntax and easier to use in backend without adding extra steps
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')  //now all have access to the req.user.id through adding the middleware for use in their next middleware

// router.get('/', protect, getGoals)
router.get('/', (req,res) => {
  res.json('test')
})

router.post('/', protect, setGoal)

//alternatively chain them 
    // router.route('/'). get(getGoals).post(setGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

module.exports = router