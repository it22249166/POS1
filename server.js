const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app = express()
require('colors')
const connectdb = require('./config/config')
const itemRoute = require('./Routes/itemRoute')

dotenv.config();
connectdb();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api/items',itemRoute);

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white)
  console.log(`http://localhost:${PORT}`.bgCyan.white)
});