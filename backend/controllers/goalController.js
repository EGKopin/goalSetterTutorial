//for mongoose use, all will be async await because of getting back a promise
//use express async handler to not deal with the error catching and wrap around all route middleware
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.goal){
        res.status(400)
        throw new Error('Please add a goal') //use express' error handler
    }
    const goal = await Goal.create({
        goal: req.body.goal
    })
    res.status(200).json(goal)
})

// @desc update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })
    res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal){
        res.status(400)
        throw new Error('Goal  not found')
    }
    //await goal.remove() //a different method to remove the goal 
    //res.status(200).json({id: req.params.id})
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedGoal)
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}