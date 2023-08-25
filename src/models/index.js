const { model } = require('mongoose')
const { UserSchema } = require('./User.schema.js')

const User = model('User', UserSchema)

module.exports = { User }