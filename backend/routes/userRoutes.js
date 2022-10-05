const express = require('express');
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')

//Bring in protect function from middleware; this allows use of req.user in any route
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router;