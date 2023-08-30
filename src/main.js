const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const { PORT, MONGO_DB } = process.env
const app = express()

console.log(MONGO_DB);

mongoose.connect(MONGO_DB)

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', require('./routes/auth.router'))
app.use('/company', require('./routes/data.router'))
app.use('/amo', require('./routes/amo.router.js'))

app.listen(PORT || 3000, () => {
  console.log('app is listening\nPort: ', PORT || 3000);
})
