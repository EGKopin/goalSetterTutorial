const express = require ('express');
const colors = require('colors') //requiring in main server.js file allows use in all backend
const dotenv = require ('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.port || 5000

connectDB() 

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/goals', require('./routes/goalRoutes'))
app.get('/api/users', require('./routes/userRoutes'))

app.use(errorHandler) //overwrites default and uses the one in we wrote

app.listen(port, () => console.log(`Server started on port ${port}`))