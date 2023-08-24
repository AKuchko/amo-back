const { Schema } = require('mongoose')

const UserSchema = new Schema({
  domain: String,
  clientId: String,
  access: String,
  refresh: String,
})

module.exports = { UserSchema }