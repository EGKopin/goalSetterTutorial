//for mongoose use, all will be async await because of getting back a promise
//use express async handler to not deal with the error catching and wrap around all route middleware
const asyncHandler = require('express-async-handler')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'get goals'})
})

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.goal){
        res.status(400)
        throw new Error('Please add a goal') //use express' error handler
    }
    res.status(200).json({message: 'set goal'})
})

// @desc update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: 'change goals'})
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `delete goal ${id}`})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}