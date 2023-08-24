const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const { PORT, MONGO_DB } = process.env
const app = express()

mongoose.connect(MONGO_DB)

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', require('./routes/auth.router'))
app.use('/company', require('./routes/data.router'))
app.use('/amo', require('./routes/amo.router.js'))

app.listen(PORT, () => {
  console.log('app is listening\nPort: ', PORT);
})
