const express = require ('express');
const dotenv = require ('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.port || 5000

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/api/goals', require('./routes/goalRoutes'))

app.use(errorHandler) //overwrites default and uses the one in we wrote

app.listen(port, () => console.log(`Server started on port ${port}`))